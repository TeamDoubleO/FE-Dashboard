import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Background from '../components/background/Background';
import './css/DashboardSample2.css';

interface SummaryBlock {
  label: string;
  인원: number;
  차량: number;
  colorClass: string;
  stats: {
    현재: number;
    입장: number;
    퇴장: number;
    잔류: number;
  };
}

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

const DashboardSample2 = () => {
  const summaryBlocks: SummaryBlock[] = [
    {
      label: '전체',
      인원: 320,
      차량: 150,
      colorClass: 'color1',
      stats: { 현재: 320, 입장: 200, 퇴장: 90, 잔류: 30 },
    },
    {
      label: '환자',
      인원: 180,
      차량: 80,
      colorClass: 'color2',
      stats: { 현재: 180, 입장: 100, 퇴장: 60, 잔류: 20 },
    },
    {
      label: '보호자',
      인원: 90,
      차량: 40,
      colorClass: 'color3',
      stats: { 현재: 90, 입장: 60, 퇴장: 20, 잔류: 10 },
    },
    {
      label: '방문',
      인원: 35,
      차량: 10,
      colorClass: 'color4',
      stats: { 현재: 35, 입장: 20, 퇴장: 10, 잔류: 5 },
    },
    {
      label: '버스',
      인원: 12,
      차량: 6,
      colorClass: 'color5',
      stats: { 현재: 12, 입장: 8, 퇴장: 3, 잔류: 1 },
    },
    {
      label: '기타',
      인원: 5,
      차량: 2,
      colorClass: 'color6',
      stats: { 현재: 5, 입장: 3, 퇴장: 1, 잔류: 1 },
    },
  ];

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
    <>
      <Background />
      <Layout>
        <div className="summary-wrapper">
          <h3 className="summary-title">정후문 출입현황 전체 요약 정보</h3>
          <div className="summary-card-container">
            {summaryBlocks.map((block, index) => (
              <div className="summary-card" key={index}>
                <div className={`summary-card-header ${block.colorClass}`}>
                  <div className="summary-label">{block.label}</div>
                  <div className="summary-sub">인원: {block.인원} 차량: {block.차량}</div>
                </div>
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>현재</th>
                      <th>입장</th>
                      <th>퇴장</th>
                      <th>잔류</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>인원</td>
                      <td>{block.stats.현재}</td>
                      <td>{block.stats.입장}</td>
                      <td>{block.stats.퇴장}</td>
                      <td>{block.stats.잔류}</td>
                    </tr>
                    <tr>
                      <td>차량</td>
                      <td>{block.차량 * 2}</td>
                      <td>{Math.floor(block.차량 * 1.2)}</td>
                      <td>{Math.floor(block.차량 * 0.6)}</td>
                      <td>{Math.floor(block.차량 * 0.2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* 병원 출입 검색 UI */}
          <div className="hospital-filter-wrapper">
            <div className="filter-row">
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

            <div className="filter-row">
              <div className="section-title">부서명</div>
              <input type="text" placeholder="부서를 입력하세요" />
              <label><input type="checkbox" /> 포함</label>
            </div>

            <div className="checkbox-grid">
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

            <div className="tag-box">
              <div>선택된 부서:</div>
              {selectedDepartments.map((dept) => (
                <span key={dept} className="tag" onClick={() => removeDepartment(dept)}>{dept} ✕</span>
              ))}
            </div>

            <div className="tag-box">
              <div>검색 키워드:</div>
              {selectedDepartments.map((dept) => (
                <span key={dept + '-keyword'} className="tag" onClick={() => removeDepartment(dept)}>{dept} ✕</span>
              ))}
            </div>

            <div className="footer-row">
              <div>총 <strong>{selectedDepartments.length}건</strong>의 검색항목이 선택되었습니다.</div>
              <div className="filter-buttons">
                <button>초기화</button>
                <button>취소</button>
                <button className="confirm">완료</button>
              </div>
            </div>
          </div>

        </div>
      </Layout>
    </>
  );
};

export default DashboardSample2;