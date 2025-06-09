import { AiFillWarning } from "react-icons/ai";
import './css/Warning.css';

const Warning = () => {
  return (
    <div className="warning-container">
      <AiFillWarning className="warning-icon" />
      <h1 className="warning-title">현재 페이지 이용 불가</h1>
      <p className="warning-message">
        현재 해당 페이지는 사용하실 수 없습니다.<br />
        서버 상태를 점검 중이오니 잠시 후 다시 시도해 주세요.
      </p>
    </div>
  );
};

export default Warning;
