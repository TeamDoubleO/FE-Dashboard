import { useState, useEffect } from 'react';
import ReusableInput from '../input/ReusableInput.tsx';
import ReusableButton from '../buttons/ReusableButton.tsx';
import './css/AdminAccessPolicyBox.css';
import { AxiosError } from 'axios';
import { fetchAccessPolicy, updateAccessPolicy } from "../../apis/policyApi.ts";
import Loading from "../loading/Loading.tsx";

const AdminAccessPolicyBox = () => {
  const [maxDays, setMaxDays] = useState('2');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [hour, setHour] = useState('09');
  const [minute, setMinute] = useState('00');
  const [maxGuardians, setMaxGuardians] = useState('1');

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const data = await fetchAccessPolicy();
        console.log('[출입정책 조회 응답]', data);
        setInitialData(data);
        setMaxDays(data.reserveDayOffset.toString());

        const [hh, mm] = data.cutoffTime.split(':');
        const hourInt = parseInt(hh, 10);

        if (hourInt === 0) {
          setPeriod('AM');
          setHour('12');
        } else if (hourInt < 12) {
          setPeriod('AM');
          setHour(hh.padStart(2, '0'));
        } else if (hourInt === 12) {
          setPeriod('PM');
          setHour('12');
        } else {
          setPeriod('PM');
          setHour((hourInt - 12).toString().padStart(2, '0'));
        }

        setMinute(mm);
        setMaxGuardians(data.maxGuardianNum.toString());
      } catch (error: unknown) {
        console.error("출입 신청 정책 로딩 오류", error);
      }
    };

    getPolicy();
  }, []);

  const handleMaxDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setMaxDays(onlyNumbers);
  };

  const handleMaxGuardiansChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setMaxGuardians(onlyNumbers);
  };

  const formattedTime = `${period} ${hour}:${minute}`;

  const handleSave = async () => {
    const convertedHour =
      period === 'AM'
        ? hour === '12' ? '00' : hour
        : hour === '12' ? '12' : (parseInt(hour) + 12).toString().padStart(2, '0');

    const updatedPolicy = {
      reserveDayOffset: parseInt(maxDays),
      cutoffTime: `${convertedHour}:${minute}:00`,
      maxGuardianNum: parseInt(maxGuardians),
    };

    console.log('[출입정책 저장 요청]', updatedPolicy);

    try {
      await updateAccessPolicy(updatedPolicy);
      console.log('[출입정책 저장 성공]', updatedPolicy);
      alert('출입 신청 정책이 성공적으로 수정되었습니다.');
      setInitialData(updatedPolicy);
    } catch (error: unknown) {
      console.error('[출입정책 저장 실패]', error);
      if (error instanceof AxiosError) {
        const message = error.response?.data?.data?.message ?? '출입 신청 정책을 수정할 수 없습니다.';
        alert(message);
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  if (!initialData) {
    return (
      <div className="dashboard-pass-loading-overlay">
        <Loading />
        <div className="dashboard-pass-loading-text">출입 정책을 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="admin-access-policy-container">
      <h2 className="admin-access-policy-title">현재 출입 신청 정책</h2>
      <div className="admin-access-policy-current-box">
        <ul className="admin-access-policy-current-list">
          <li>
            방문 예정 날짜 기준 <strong>{initialData.reserveDayOffset}일 전 {formattedTime}</strong>부터 신청 가능합니다.
          </li>
          <li>
            현재 보호자 수 제한 <strong>{initialData.maxGuardianNum}명까지</strong> 허용됩니다.
          </li>
        </ul>
      </div>

      <h2 className="admin-access-policy-title">출입 신청 정책 설정</h2>

      <div className="admin-access-policy-section">
        <label className="admin-access-policy-label">
          출입 신청 가능 최대 기간 (일)
        </label>
        <ReusableInput
          type="text"
          value={maxDays}
          onChange={handleMaxDaysChange}
          className="admin-access-policy-input input-offset"
        />
      </div>

      <div className="admin-access-policy-section middle-section">
        <label className="admin-access-policy-label">
          당일 출입 신청 마감 시간
          <span className="admin-access-policy-subtext">
            (이후엔 익일 이후만 신청 가능)
          </span>
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
          한 명의 환자에 대해 방문 가능한 최대 보호자 수
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

      <div className="admin-access-policy-button-wrapper">
        <ReusableButton className="admin-access-policy-button" onClick={handleSave}>
          저장
        </ReusableButton>
      </div>
    </div>
  );
};

export default AdminAccessPolicyBox;
