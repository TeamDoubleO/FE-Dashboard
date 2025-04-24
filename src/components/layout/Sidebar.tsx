import React, { useState } from "react";
import "./css/Sidebar.css";

interface SidebarProps {
  currentPage: string;
  currentSidebarItem: string;
  onSidebarItemClick: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, currentSidebarItem, onSidebarItemClick }) => {
  const renderMenu = () => {
    let items: string[] = [];

    switch (currentPage) {
      case "대시보드":
        items = ["대시보드 홈", "사이드 메뉴"];
        break;
      case "사원 정보":
        items = ["사원 정보 관리"];
        break;
      case "출입 권한":
        items = ["보안 그룹 관리", "구역관리", "사원 권한 관리리"];
        break;
      case "마이 페이지":
        items = ["내 프로필", "설정"];
        break;
      default:
        items = ["메뉴 없음"];
    }

    return (
      <ul>
        {items.map((label) => (
          <li
            key={label}
            onClick={() => onSidebarItemClick(label)}
            className={currentSidebarItem === label ? "active" : ""}
          >
            {label}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="sidebar">{renderMenu()}</div>;
};

export default Sidebar;
