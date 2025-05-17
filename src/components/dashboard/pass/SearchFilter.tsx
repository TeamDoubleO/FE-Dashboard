import { useState } from 'react';
import './css/SearchFilter.css';

const departmentList = [
  '병동관리팀',
  '진료지원팀',
  '의료정보팀',
  '감염관리팀',
  '전산보안팀',
  '시설관리팀',
  '환자안전팀',
  '진료과팀',
  '병리과팀',
  '영상의학팀',
  '중환자실팀',
  '응급의료팀',
  '영양팀',
  '약제팀'
];

const SearchFilter = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['직원']);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(['병동관리팀', '의료정보팀', '전산보안팀']);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTypes(prev =>
      checked ? [...prev, value] : prev.filter(t => t !== value)
    );
  };

  const handleDepartmentChange = (dept: string, checked: boolean) => {
    setSelectedDepartments(prev =>
      checked ? [...prev, dept] : prev.filter(d => d !== dept)
    );
  };

  const removeDepartment = (dept: string) => {
    setSelectedDepartments(prev => prev.filter(d => d !== dept));
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter-row">
        {['직원', '병동', '외래', '방문객'].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleCheckboxChange}
            /> {type}
          </label>
        ))}
        <input type="text" placeholder="병동 또는 구역 검색" />
        <input type="text" placeholder="결과내 재검색" />
        <label><input type="radio" name="view" defaultChecked /> 요약</label>
        <label><input type="radio" name="view" /> 상세목록</label>
      </div>

      <div className="search-filter-row">
        <div className="search-filter-section-title">부서명</div>
        <input type="text" placeholder="부서를 입력하세요" />
        <label><input type="checkbox" /> 포함</label>
      </div>

      <div className="search-filter-checkbox-grid">
        {departmentList.map(dept => (
          <label key={dept}>
            <input
              type="checkbox"
              checked={selectedDepartments.includes(dept)}
              onChange={(e) => handleDepartmentChange(dept, e.target.checked)}
            /> {dept}
          </label>
        ))}
      </div>

      <div className="search-filter-tag-box">
        <div>선택된 부서:</div>
        {selectedDepartments.map((dept) => (
          <span key={dept} className="search-filter-tag" onClick={() => removeDepartment(dept)}>{dept} ✕</span>
        ))}
      </div>

      <div className="search-filter-footer-row">
        <div>총 <strong>{selectedDepartments.length}건</strong>의 검색항목이 선택되었습니다.</div>
        <div className="search-filter-buttons">
          <button>초기화</button>
          <button>취소</button>
          <button className="confirm">완료</button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
