import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminLoginBox.css";
import ReusableButton from "../buttons/ReusableButton";
import { adminLogin } from "../../apis/loginApi";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await adminLogin({
        username: adminId,
        password: password,
      });
    const token = response.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        onLogin();
        navigate("/dashboard");
      } else {
        setError("로그인 실패: 엑세스 토큰이 없음");
      }
    } catch (error: any) {
      setError(error.message); 
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>관리자 로그인</h2>
        <p className="admin-login-subtitle">웹 관리자 모드로 로그인하세요.</p>

        <form onSubmit={handleSubmit}>
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

          <ReusableButton type="submit" className="admin-login-button">
            로그인
          </ReusableButton>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
