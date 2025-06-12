import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminLoginBox.css";
import ReusableButton from "../buttons/ReusableButton";
import ReusableInput from "../input/ReusableInput";

import { adminLogin } from "../../apis/loginApi";
import { checkPassLogHealthCheck } from "../../apis/passApi";
import { usePassLogContext } from "../../contexts/PassLogContext.tsx";

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsPassLogAvailable, setHasCheckedAvailability } = usePassLogContext();

  useEffect(() => {
    const darkMode = localStorage.getItem("theme") === "dark";
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await adminLogin({
        username: adminId,
        password: password,
      });
    const token = response.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("skipFirstCheck", "true");
        onLogin();
        try {
          await checkPassLogHealthCheck();
          setIsPassLogAvailable(true);
          setHasCheckedAvailability(true);
          navigate("/dashboardstats");
        } catch (error) {
          console.error("<--- 출입 로그 조회 실패:", error); 
          setIsPassLogAvailable(false);
          setHasCheckedAvailability(true); 
          navigate("/admin/mypage");
        }

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
          <ReusableInput
            type="text"
            name="username"
            autoComplete="username"
            placeholder="관리자ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="admin-login-input"
          />
          <ReusableInput
            type="password"
            name="password"
            autoComplete="current-password"
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
