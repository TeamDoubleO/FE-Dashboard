import { useState, useEffect } from 'react';
import './css/SearchFilter.css';
import { fetchBuildings, fetchAreas, fetchStatsByFilter, convertUserTypesToCategories } from '../../../apis/dashPassApi';
import type { Area } from '../../../apis/dashPassApi';

const userTypes = ['전체', '환자', '보호자', '방문객'];
const periodOptions = [
  { label: '최근 7일', days: 7 },
  { label: '최근 14일', days: 14 },
  { label: '최근 28일', days: 28 },
];

interface SearchFilterProps {
  onApply: (filters: {
    startDate: string;
    endDate: string;
    userTypes: string[];
    buildings: number[];
    zones: string[];
  }) => void;
}

const getDateDiff = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  return diffTime / (1000 * 60 * 60 * 24) + 1;
};

const SearchFilter = ({ onApply }: SearchFilterProps) => {
  const [buildings, setBuildings] = useState<{ buildingId: number; buildingName: string }[]>([]);
  const [selectedBuildingIds, setSelectedBuildingIds] = useState<number[]>([]);
  const [zoneList, setZoneList] = useState<(Area & { buildingName: string })[]>([]);
  const [selectedZones, setSelectedZones] = useState<(Area & { buildingName: string })[]>([]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [warnings, setWarnings] = useState<{ type?: string; zone?: string; date?: string }>({});
  const [isValid, setIsValid] = useState(false);
  const [useCustomDate, setUseCustomDate] = useState(false);

  useEffect(() => {
    fetchBuildings().then(setBuildings).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchAllAreas = async () => {
      try {
        const areaPromises = selectedBuildingIds.map((id) =>
          fetchAreas(id).then((areas) =>
            areas.map((area) => ({
              ...area,
              buildingId: id,
              buildingName: buildings.find((b) => b.buildingId === id)?.buildingName || '알수없음',
            }))
          )
        );
        const allAreas = (await Promise.all(areaPromises)).flat();
        const uniqueAreas = Array.from(new Map(allAreas.map((a) => [a.areaId, a])).values());
        setZoneList(uniqueAreas);
      } catch (err) {
        console.error('구역 목록 불러오기 실패:', err);
      }
    };

    if (selectedBuildingIds.length > 0) {
      fetchAllAreas();
    } else {
      setZoneList([]);
    }
  }, [selectedBuildingIds, buildings]);

  useEffect(() => {
    setIsValid(validate(true));
  }, [selectedTypes, selectedZones, startDate, endDate]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (value === '전체') {
      setSelectedTypes(checked ? userTypes.filter((t) => t !== '전체') : []);
    } else {
      setSelectedTypes((prev) =>
        checked ? [...prev, value] : prev.filter((t) => t !== value)
      );
    }
  };

  const handleBuildingChange = (id: number | '전체', checked: boolean) => {
    if (id === '전체') {
      setSelectedBuildingIds(checked ? buildings.map((b) => b.buildingId) : []);
    } else {
      setSelectedBuildingIds((prev) =>
        checked ? [...prev, id] : prev.filter((b) => b !== id)
      );
    }
  };

  const handleZoneChange = (zone: Area & { buildingName: string }, checked: boolean) => {
    setSelectedZones((prev) =>
      checked ? [...prev, zone] : prev.filter((z) => z.areaId !== zone.areaId)
    );
  };

  const handleAllZonesInBuilding = (buildingName: string, checked: boolean) => {
    const zonesInBuilding = zoneList.filter((z) => z.buildingName === buildingName);
    setSelectedZones((prev) => {
      const filtered = prev.filter((z) => z.buildingName !== buildingName);
      return checked ? [...filtered, ...zonesInBuilding] : filtered;
    });
  };

  const removeZone = (areaId: number) => {
    setSelectedZones((prev) => prev.filter((z) => z.areaId !== areaId));
  };

  const handlePeriodChange = (days: number) => {
    setUseCustomDate(false);
    setSelectedPeriod(days);
    const end = new Date();
    end.setDate(end.getDate() - 1);
    const start = new Date(end);
    start.setDate(end.getDate() - days + 1);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const validate = (showWarning = true) => {
    const newWarnings: typeof warnings = {};
    if (selectedTypes.length === 0) newWarnings.type = '하나 이상의 사용자를 선택해야 합니다.';
    if (selectedZones.length === 0) newWarnings.zone = '하나 이상의 구역을 선택해야 합니다.';
    if (!startDate || !endDate || startDate > endDate) {
      newWarnings.date = '기간을 올바르게 선택해주세요 (시작일 ≤ 종료일).';
    } else {
      const diff = getDateDiff(startDate, endDate);
      if (diff < 7 || diff > 28) {
        newWarnings.date = '기간은 최소 7일 이상, 최대 28일 이하여야 합니다.';
      }
    }

    if (showWarning) setWarnings(newWarnings);
    return Object.keys(newWarnings).length === 0;
  };

  const handleConfirm = async () => {
    if (!validate()) return;

    const categories = convertUserTypesToCategories(selectedTypes);
    const areaCodes = selectedZones.map((z) => z.areaCode);

    try {
      const result = await fetchStatsByFilter({
        categories,
        startDate,
        endDate,
        areaCodes,
      });
      console.log('[RESULT] 출입 통계 결과:', result);
    } catch (error) {
      console.error('[ERROR] 출입 통계 조회 실패:', error);
    }

    onApply({
      startDate,
      endDate,
      userTypes: selectedTypes,
      buildings: selectedBuildingIds,
      zones: selectedZones.map((z) => `${z.areaCode}||${z.buildingName}: ${z.areaName}`),
    });
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedZones([]);
    setSelectedBuildingIds([]);
    setSelectedPeriod(null);
    setUseCustomDate(false);
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setWarnings({});
  };

  const isAllBuildingsSelected =
    buildings.length > 0 && selectedBuildingIds.length === buildings.length;

  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const get28DaysAgo = () => {
    const date = new Date();
    date.setDate(date.getDate() - 28);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter-row">
        {userTypes.map((type) => (
          <label key={type} className="custom-checkbox">
            <input
              type="checkbox"
              value={type}
              checked={
                type === '전체'
                  ? selectedTypes.length === userTypes.length - 1
                  : selectedTypes.includes(type)
              }
              onChange={handleCheckboxChange}
            />
            <span className="checkmark" />
            {type}
          </label>
        ))}
        {warnings.type && <div className="search-filter-warning-text">{warnings.type}</div>}
      </div>

      <div className="search-filter-row">
        <div className="search-filter-section-title">기간 선택</div>
        {periodOptions.map((opt) => (
          <label key={opt.days} className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedPeriod === opt.days}
              onChange={() => handlePeriodChange(opt.days)}
            />
            <span className="checkmark" />
            {opt.label}
          </label>
        ))}
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={useCustomDate}
            onChange={(e) => {
              setUseCustomDate(e.target.checked);
              setSelectedPeriod(null);
              if (!e.target.checked) {
                setStartDate('');
                setEndDate('');
              }
            }}
          />
          <span className="checkmark" />직접 선택
        </label>
        {useCustomDate && (
          <>
            <input
              type="date"
              value={startDate}
              min={get28DaysAgo()}
              max={getYesterday()}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>~</span>
            <input
              type="date"
              value={endDate}
              min={startDate || get28DaysAgo()}
              max={getYesterday()}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </>
        )}
        {warnings.date && <div className="search-filter-warning-text">{warnings.date}</div>}
      </div>

      <div className="search-filter-row">
        <div className="search-filter-section-title">건물 선택</div>
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={isAllBuildingsSelected}
            onChange={(e) => handleBuildingChange('전체', e.target.checked)}
          />
          <span className="checkmark" />
          전체
        </label>
        {buildings.map((b) => (
          <label key={b.buildingId} className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedBuildingIds.includes(b.buildingId)}
              onChange={(e) => handleBuildingChange(b.buildingId, e.target.checked)}
            />
            <span className="checkmark" />
            {b.buildingName}
          </label>
        ))}
      </div>

      <div className="search-filter-row">
        <div className="search-filter-section-title">구역명</div>
        <input
          type="text"
          placeholder="구역명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="search-filter-checkbox-grid">
        {Object.entries(
          zoneList
            .filter((z) => z.areaName.includes(searchTerm.trim()) || searchTerm.trim() === '')
            .reduce((acc, z) => {
              if (!acc[z.buildingName]) acc[z.buildingName] = [];
              acc[z.buildingName].push(z);
              return acc;
            }, {} as Record<string, (Area & { buildingName: string })[]>)
        ).map(([building, zones]) => {
          const allSelected = zones.every((z) => selectedZones.some((sz) => sz.areaId === z.areaId));
          return (
            <div key={building} className="zone-group">
              <div className="zone-group-title">{building}</div>
              <div className="zone-group-zones">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => handleAllZonesInBuilding(building, e.target.checked)}
                  />
                  <span className="checkmark" />
                  전체
                </label>
                {zones.map((zone) => (
                  <label key={zone.areaId} className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedZones.some((z) => z.areaId === zone.areaId)}
                      onChange={(e) => handleZoneChange(zone, e.target.checked)}
                    />
                    <span className="checkmark" />
                    {zone.areaName}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
        {warnings.zone && <div className="search-filter-warning-text">{warnings.zone}</div>}
      </div>

      <div className="search-filter-tag-box">
        <div>선택된 구역:</div>
        {selectedZones.map((zone) => (
          <span key={zone.areaId} className="search-filter-tag" onClick={() => removeZone(zone.areaId)}>
            {zone.buildingName}: {zone.areaName} ✕
          </span>
        ))}
      </div>

      <div className="search-filter-footer-row">
        <div>
          총 <strong>{selectedZones.length}건</strong>의 검색항목이 선택되었습니다.
        </div>
        <div className="search-filter-buttons">
          <button onClick={handleReset}>초기화</button>
          <button onClick={() => setWarnings({})}>취소</button>
          <button
            className={`confirm ${isValid ? 'active' : 'disabled'}`}
            disabled={!isValid}
            onClick={handleConfirm}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
