import { useState } from 'react';
import './css/Sidebar.css';
import { FaBars } from 'react-icons/fa';
import { IoChevronForward, IoChevronDownOutline } from 'react-icons/io5';

import { IoMdHome } from 'react-icons/io';
import { MdOutlineKey, MdSettings } from 'react-icons/md';

import SidebarButtonGray from '../../assets/images/KEYWE-sidebar-button-gray.png';
import SidebarButtonGreen from '../../assets/images/KEYWE-sidebar-button-green.png';

// group 타입 지정
type Group = 'dashboard' | 'access' | 'admin';
interface GroupOpenState {
  dashboard: boolean;
  access: boolean;
  admin: boolean;
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [groupOpen, setGroupOpen] = useState<GroupOpenState>({
    dashboard: true,
    access: true,
    admin: true,
  });
  const [selectedMenu, setSelectedMenu] = useState<string>('방문자 통계');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>('dashboard');


  // 사이드바 열기/닫기 토글
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 그룹 열기/닫기 토글
  const toggleGroup = (group: Group) => {
    setGroupOpen(prev => ({ ...prev, [group]: !prev[group] }));
  };

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
            {!isOpen && (
              <IoMdHome className={`sidebar-menu-icon ${groupOpen.dashboard ? 'sidebar-menu-open' : ''}`} />
            )}
            {isOpen && (
              <>
                <span>대시보드</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.dashboard 
                    ? <IoChevronDownOutline className="sidebar-chevron-icon" /> 
                    : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.dashboard && (
            <ul>
              <li
                className={selectedMenu === '방문자 통계' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('방문자 통계');
                  setSelectedGroup('dashboard');
                }}
              >
                {isOpen 
                  ? <span>방문자 통계</span> 
                  : <img 
                      src={selectedMenu === '방문자 통계' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
              <li
                className={selectedMenu === '대시보드' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('대시보드');
                  setSelectedGroup('dashboard');
                }}
              >
                {isOpen 
                  ? <span>대시보드</span> 
                  : <img 
                      src={selectedMenu === '대시보드' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
            </ul>
          )}
        </li>

        {/* 출입 관련 그룹 */}
        <li className="sidebar-menu-group">
          <div 
            className={`sidebar-menu-title ${selectedGroup === 'access' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('access')}
          >
            {!isOpen && (
              <MdOutlineKey className={`sidebar-menu-icon ${groupOpen.access ? 'sidebar-menu-open' : ''}`} />
            )}
            {isOpen && (
              <>
                <span>출입 관련</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.access 
                    ? <IoChevronDownOutline className="sidebar-chevron-icon" /> 
                    : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.access && (
            <ul>
              <li
                className={selectedMenu === '출입 내역' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('출입 내역');
                  setSelectedGroup('access');
                }}
              >
                {isOpen 
                  ? <span>출입 내역</span> 
                  : <img 
                      src={selectedMenu === '출입 내역' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
              <li
                className={selectedMenu === '출입증 발급 내역' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('출입증 발급 내역');
                  setSelectedGroup('access');
                }}
              >
                {isOpen 
                  ? <span>출입증 발급 내역</span> 
                  : <img 
                      src={selectedMenu === '출입증 발급 내역' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
            </ul>
          )}
        </li>

        {/* 관리페이지 그룹 */}
        <li className="sidebar-menu-group">
          <div 
            className={`sidebar-menu-title ${selectedGroup === 'admin' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('admin')}
          >
            {!isOpen && (
              <MdSettings className={`sidebar-menu-icon ${groupOpen.admin ? 'sidebar-menu-open' : ''}`} />
            )}
            {isOpen && (
              <>
                <span>관리페이지</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.admin 
                    ? <IoChevronDownOutline className="sidebar-chevron-icon" /> 
                    : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.admin && (
            <ul>
              <li
                className={selectedMenu === '마이페이지1' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('마이페이지1');
                  setSelectedGroup('admin');
                }}
              >
                {isOpen 
                  ? <span>마이페이지1</span> 
                  : <img 
                      src={selectedMenu === '마이페이지1' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
              <li
                className={selectedMenu === '마이페이지2' ? 'selected' : ''}
                onClick={() => {
                  setSelectedMenu('마이페이지2');
                  setSelectedGroup('admin');
                }}
              >
                {isOpen 
                  ? <span>마이페이지2</span> 
                  : <img 
                      src={selectedMenu === '마이페이지2' ? SidebarButtonGreen : SidebarButtonGray} 
                      alt="sidebar-icon" 
                      className="sidebar-collapsed-image" 
                    />
                }
              </li>
            </ul>
          )}
        </li>

      </ul>
    </aside>
  );
};

export default Sidebar;
