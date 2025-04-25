import React from "react";
import "./css/Breadcrumb.css";

interface BreadcrumbProps {
  currentPage: string;
  currentSidebarItem: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPage,
  currentSidebarItem,
}) => {
  return (
    <div className="breadcrumb">
      <span className="breadcrumb-item">{currentPage}</span>
      <span className="breadcrumb-separator">{">"}</span>
      <span className="breadcrumb-item">{currentSidebarItem}</span>
    </div>
  );
};

export default Breadcrumb;
