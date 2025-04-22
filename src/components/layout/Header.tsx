import React from "react";
import logo from "/src/assets/images/KEYWE_logo.png";
import "./css/Header.css";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const menuItems = ["대시보드", "사원 정보", "출입 권한", "마이 페이지"];

  return (
    <header className="header">
      <img src={logo} alt="로고" className="header-logo" />

      <nav className="header-nav">
        {menuItems.map((item) => (
          <span
            key={item}
            className={`header-nav-item ${currentPage === item ? "active" : ""}`}
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