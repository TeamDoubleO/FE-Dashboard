import React, { useState } from "react";
import "./css/AdminLoginBox.css";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 로그인 로직 샘플
    if (adminId === "admin" && password === "1234") {
      onLogin();
    } else {
      setError("일치하는 정보가 존재하지 않습니다.\n입력 내용을 다시 확인해주세요.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>관리자 로그인</h2>
        <p className="admin-login-subtitle">웹 관리자 모드로 로그인하세요.</p>
        <input
          type="text"
          className="admin-login-input"
          placeholder="관리자 ID"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />
        <input
          type="password"
          className="admin-login-input"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="admin-login-error">{error}</p>}
        <button className="admin-login-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
