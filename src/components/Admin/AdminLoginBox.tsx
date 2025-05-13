import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/AdminLoginBox.css";
import ReusableButton from "../buttons/ReusableButton";
import ReusableInput from "../input/ReusableInput";

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
      const response = await axios.post("http://localhost:8082/auth/login", {
        username: adminId,
        password: password,
      });

      if (response.data.success) {
        const token = response.data.data.accessToken;
        localStorage.setItem("accessToken", token);

        onLogin();
        navigate("/dashboard");
      } else {
        setError("로그인 실패: 서버 응답 오류");
      }
    } catch (err: any) {
      const message = err?.response?.data?.data?.message;
      if (message) {
        setError(message);
      }
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
          <ReusableInput
            type="text"
            placeholder="관리자 ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="admin-login-input"
          />
          <ReusableInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-login-input"
            showToggle
            iconClassName="admin-login-reusable-input-icon"
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
