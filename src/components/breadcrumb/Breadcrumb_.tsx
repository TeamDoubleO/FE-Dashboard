import React from "react";
import "./css/Breadcrumb.css";

interface BreadcrumbProps {
  currentPage: string;
  firstSidebarItem: string;
  secondSidebarItem: string;
}

const Breadcrumb_: React.FC<BreadcrumbProps> = ({
  currentPage,
  firstSidebarItem,
  secondSidebarItem,
}) => {
  return (
    <div className="breadcrumb">
      <span className="breadcrumb-item">{currentPage}</span>
      <span className="breadcrumb-separator">{">"}</span>
      <span className="breadcrumb-item">{firstSidebarItem}</span>
      <span className="breadcrumb-separator">{">"}</span>
      <span className="breadcrumb-item">{secondSidebarItem}</span>
    </div>
  );
};

export default Breadcrumb_;
