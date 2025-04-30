import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Sidebar.css';
import { FaBars } from 'react-icons/fa';
import { IoChevronForward, IoChevronDownOutline } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineKey, MdSettings } from 'react-icons/md';

import SidebarButtonGray from '../../assets/images/KEYWE-sidebar-button-gray.png';
import SidebarButtonGreen from '../../assets/images/KEYWE-sidebar-button-green.png';

type Group = 'dashboard' | 'access' | 'admin';
interface GroupOpenState {
  dashboard: boolean;
  access: boolean;
  admin: boolean;
}

const menuPathMap: Record<string, string> = {
  '방문자 통계': '/dashboard',
  '대시보드': '/dashboard',
  '출입 내역': '/entryhistory',
  '출입증 발급 내역': '/issuehistory',
  '마이페이지1': '/admin/mypage',
  '마이페이지2': '/admin/mypage',
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 처음 들어가면 사이드바 오픈 상태로!
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? saved === 'true' : true;
  });

  const [groupOpen, setGroupOpen] = useState<GroupOpenState>({
    dashboard: true,
    access: true,
    admin: true,
  });

  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const toggleGroup = (group: Group) => {
    setGroupOpen(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const handleMenuClick = (menu: string, group: Group) => {
    setSelectedMenu(menu);
    setSelectedGroup(group);
    navigate(menuPathMap[menu]);
  };

  // 현재 URL 경로에 따라 사이드바의 선택 메뉴 및 그룹 상태를 설정
  useEffect(() => {
    const foundEntry = Object.entries(menuPathMap).find(
      ([_, path]) => path === location.pathname
    );

    if (foundEntry) {
      const [menu, path] = foundEntry;
      setSelectedMenu(menu);

      if (path.includes('/dashboard')) setSelectedGroup('dashboard');
      else if (path.includes('/entry') || path.includes('/issue')) setSelectedGroup('access');
      else if (path.includes('/admin')) setSelectedGroup('admin');
    }
  }, [location.pathname]);

  // 현재 선택된 메뉴와 그룹 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('selectedMenu', selectedMenu);
    localStorage.setItem('selectedGroup', selectedGroup ?? '');
  }, [selectedMenu, selectedGroup]);

  // 사이드바 열림/닫힘 상태 저장!
  useEffect(() => {
    localStorage.setItem('sidebarOpen', isOpen.toString());
  }, [isOpen]);

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        <FaBars className="sidebar-hamburger-icon" />
      </button>

      <ul className="sidebar-menu">
        {/* 대시보드 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'dashboard' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('dashboard')}
          >
            {!isOpen ? (
              <IoMdHome className={`sidebar-menu-icon ${groupOpen.dashboard ? 'sidebar-menu-open' : ''}`} />
            ) : (
              <>
                <span>대시보드</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.dashboard ? <IoChevronDownOutline className="sidebar-chevron-icon" /> : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.dashboard && (
            <ul>
              {['방문자 통계', '대시보드'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'dashboard')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <img
                      src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                      alt="sidebar-icon"
                      className="sidebar-collapsed-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* 출입 관련 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'access' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('access')}
          >
            {!isOpen ? (
              <MdOutlineKey className={`sidebar-menu-icon ${groupOpen.access ? 'sidebar-menu-open' : ''}`} />
            ) : (
              <>
                <span>출입 관련</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.access ? <IoChevronDownOutline className="sidebar-chevron-icon" /> : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.access && (
            <ul>
              {['출입 내역', '출입증 발급 내역'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'access')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <img
                      src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                      alt="sidebar-icon"
                      className="sidebar-collapsed-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* 관리페이지 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'admin' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('admin')}
          >
            {!isOpen ? (
              <MdSettings className={`sidebar-menu-icon ${groupOpen.admin ? 'sidebar-menu-open' : ''}`} />
            ) : (
              <>
                <span>관리페이지</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.admin ? <IoChevronDownOutline className="sidebar-chevron-icon" /> : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.admin && (
            <ul>
              {['마이페이지1', '마이페이지2'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'admin')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <img
                      src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                      alt="sidebar-icon"
                      className="sidebar-collapsed-image"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
