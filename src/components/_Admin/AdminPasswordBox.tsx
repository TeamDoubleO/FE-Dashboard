import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableButton from '../buttons/ReusableButton';
import ReusableInput from '../input/ReusableInput';
import { updateAdminPassword } from "../../apis/adminApi";

import './css/AdminPasswordBox.css';

const AdminPasswordBox = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      await updateAdminPassword({
        passwordOriginal: currentPassword,
        passwordNew: newPassword,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/admin/mypage");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <div className="admin-password-container">
      <h2 className="admin-password-title">비밀번호 변경</h2>
      <div className="admin-password-form">
        <ReusableInput
          label="현재 비밀번호"
          type="password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          showToggle
          className="admin-password-input"
          iconClassName="admin-password-reusable-input-icon"
        />
        <ReusableInput
          label="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          showToggle
          className="admin-password-input"
          iconClassName="admin-password-reusable-input-icon"
        />
        <ReusableInput
          label="새 비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          showToggle
          className="admin-password-input"
          iconClassName="admin-password-reusable-input-icon"
        />

        <div className="admin-password-form-actions">
          <ReusableButton onClick={handlePasswordChange} className="primary">
            비밀번호 변경하기
          </ReusableButton>

          <ReusableButton onClick={() => navigate("/admin/mypage")} className="secondary">
            취소
          </ReusableButton>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordBox;
