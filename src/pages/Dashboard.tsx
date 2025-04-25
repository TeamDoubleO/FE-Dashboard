import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Background from "../components/background/Background";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("대시보드");
  const [currentSidebarItem, setCurrentSidebarItem] = useState("");

  useEffect(() => {
    let defaultItem = "";
    switch (currentPage) {
      case "대시보드":
        defaultItem = "대시보드 홈";
        break;
      case "출입 및 권한":
        defaultItem = "출입 내역";
        break;
      case "마이 페이지":
        defaultItem = "내 프로필";
        break;
    }
    setCurrentSidebarItem(defaultItem);
  }, [currentPage]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          currentPage={currentPage}
          currentSidebarItem={currentSidebarItem}
          onSidebarItemClick={setCurrentSidebarItem}
        />
        <Background>
          <p>대시보드 샘플</p>
        </Background>
      </div>
    </div>
  );
};

export default Dashboard;
