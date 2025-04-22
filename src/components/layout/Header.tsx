import React from "react";
import "./css/Header.css";
import logo from "../../assets/KEYWE-logo.png";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const menuItems = ["대시보드", "사원 정보", "출입 권한", "마이 페이지"];

  return (
    <header className="header">
      <img src={logo} alt="KEYWE 로고" className="header-logo" />
      <nav className="nav">
        {menuItems.map((item) => (
          <span
            key={item}
            className={`nav-item ${currentPage === item ? "active" : ""}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </span>
        ))}
      </nav>
    </header>
  );
};

export default Header;
