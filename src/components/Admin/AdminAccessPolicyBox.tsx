import { useState } from 'react';
import ReusableInput from '../input/ReusableInput';
import ReusableButton from '../buttons/ReusableButton';
import './css/AdminAccessPolicyBox.css';

const AdminAccessPolicyBox = () => {
  const [maxDays, setMaxDays] = useState('2');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [maxGuardians, setMaxGuardians] = useState('1');

  const handleMaxDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setMaxDays(onlyNumbers);
  };

  const handleMaxGuardiansChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setMaxGuardians(onlyNumbers);
  };

  const formattedTime = `${period} ${hour}:${minute}`;

  return (
    <div className="admin-access-policy-container">
      <h2 className="admin-access-policy-title">출입 신청 정책 설정</h2>

      <div className="admin-access-policy-section">
        <label className="admin-access-policy-label">
          출입 신청 가능 최대 기간 (일):
        </label>
        <ReusableInput
          type="text"
          value={maxDays}
          onChange={handleMaxDaysChange}
          className="admin-access-policy-input"
        />
      </div>

      <div className="admin-access-policy-section">
        <label className="admin-access-policy-label">
          당일 출입 신청 마감 시간
          <span className="admin-access-policy-subtext">
            (이후엔 익일 이후만 신청 가능)
          </span>
          :
        </label>
        <div className="admin-access-policy-select-group">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'AM' | 'PM')}
            className="admin-access-policy-select"
          >
            <option value="AM">오전</option>
            <option value="PM">오후</option>
          </select>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="admin-access-policy-select"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const val = (i + 1).toString().padStart(2, '0');
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="admin-access-policy-select"
          >
            {Array.from({ length: 60 }, (_, i) => {
              const val = i.toString().padStart(2, '0');
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="admin-access-policy-section">
        <label className="admin-access-policy-label">
          한 명의 환자에 대해 방문 가능한 최대 보호자 수:
        </label>
        <div className="admin-access-policy-select-group">
          <ReusableInput
            type="text"
            value={maxGuardians}
            onChange={handleMaxGuardiansChange}
            className="admin-access-policy-input-wide admin-access-policy-adjust"
          />
        </div>
      </div>

      <p className="admin-access-policy-note">
        * 방문 예정 날짜 기준 <span className="admin-access-policy-bold-600">{maxDays}일</span> 전{' '}
        <span className="admin-access-policy-bold-700">{formattedTime}</span>부터 신청 가능합니다
        <br />
        * 현재 보호자 수 제한: <span className="admin-access-policy-bold-600">{maxGuardians}명</span>까지 허용됩니다
      </p>

      <div className="admin-access-policy-button-wrapper">
        <ReusableButton className="admin-access-policy-button">저장</ReusableButton>
      </div>
    </div>
  );
};

export default AdminAccessPolicyBox;