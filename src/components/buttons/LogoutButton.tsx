import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/LogoutButton.css";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const confirmed = window.confirm("로그아웃하시겠습니까?");
    if (!confirmed) return;

    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://localhost:8082/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      console.warn("로그아웃 API 실패 (무시하고 계속 진행)", err);
    }

    localStorage.clear();

    onLogout();
    navigate("/admin/login");
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
