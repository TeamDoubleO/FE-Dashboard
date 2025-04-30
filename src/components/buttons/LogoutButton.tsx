import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/LogoutButton.css";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmed = window.confirm("로그아웃하시겠습니까?");
    if (confirmed) {
      onLogout();
      navigate("/admin/login");
    }
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
