import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/Sidebar.css';
import { FaBars } from 'react-icons/fa';
import { IoChevronForward, IoChevronDownOutline } from 'react-icons/io5';
import { IoMdHome } from 'react-icons/io';
import { MdSettings } from 'react-icons/md';

import { MdPersonalInjury } from "react-icons/md";
import { MdBookOnline } from "react-icons/md";
import { MdTextSnippet } from "react-icons/md";

import SidebarButtonGray from '../../assets/images/KEYWE-sidebar-button-gray.png';
import SidebarButtonGreen from '../../assets/images/KEYWE-sidebar-button-green.png';

import { usePassLogContext } from '../../contexts/PassLogContext';

type Group = 'dashboard' | 'access' | 'pending' | 'patient' | 'admin';
interface GroupOpenState {
  dashboard: boolean;
  access: boolean;
  pending: boolean;
  patient: boolean;
  admin: boolean;
}

const menuPathMap: Record<string, string> = {
  '방문자 통계': '/dashboardstats',
  '출입증 발급 현황': '/dashboardpass',
  '출입 내역': '/entryhistory',
  '출입증 발급 내역': '/issuehistory',
  '출입증 발급 신청 내역': '/passpending',
  '환자 정보 조회': '/patientlist',
  '관리자 정보': '/admin/mypage',
  '출입 정책': '/admin/accesspolicy',
  
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 처음 들어가면 사이드바 오픈 상태로!
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? saved === 'true' : true;
  });

  const [groupOpen, setGroupOpen] = useState<GroupOpenState>(() => {
    const saved = localStorage.getItem('groupOpen');
    return saved ? JSON.parse(saved) : {
      dashboard: true,
      access: true,
      pending: true,
      patient: true,
      admin: true,
    };
  });

  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const { isPassLogAvailable } = usePassLogContext();

  const toggleSidebar = () => setIsOpen(prev => !prev);

  const toggleGroup = (group: Group) => {
    setGroupOpen(prev => {
      const updated = { ...prev, [group]: !prev[group] };
      localStorage.setItem('groupOpen', JSON.stringify(updated));
      return updated;
    });
  };

  const handleMenuClick = (menu: string, group: Group) => {
    setSelectedMenu(menu);
    setSelectedGroup(group);
    navigate(menuPathMap[menu]);
  };

  // 현재 URL 경로에 따라 사이드바의 선택 메뉴 및 그룹 상태를 설정
  useEffect(() => {
    let matchedMenu: string | null = null;
    let matchedGroup: Group | null = null;

    if (location.pathname.includes('/issuedetail')) {
      matchedMenu = '출입증 발급 내역';
      matchedGroup = 'access';
    } else if (location.pathname.includes('/issuehistory')) {
      matchedMenu = '출입증 발급 내역';
      matchedGroup = 'access';
    } else if (location.pathname.includes('/entry')) {
      matchedMenu = '출입 내역';
      matchedGroup = 'access';
    } else if (location.pathname.includes('/dashboardstats')) {
      matchedMenu = '방문자 통계';
      matchedGroup = 'dashboard';
    } else if (location.pathname.includes('/dashboardpass')) {
      matchedMenu = '출입증 발급 현황';
      matchedGroup = 'dashboard';
    } else if (location.pathname.includes('/admin/accesspolicy')) {
      matchedMenu = '출입 정책';
      matchedGroup = 'admin';
    } else if (location.pathname.includes('/changepassword') || location.pathname.includes('/admin')) {
      matchedMenu = '관리자 정보';
      matchedGroup = 'admin';
    } else if (location.pathname.includes('/passpending')) {
      matchedMenu = '출입증 발급 신청 내역';
      matchedGroup = 'pending';
    } else if (location.pathname.includes('/pendingdetail')) {
      matchedMenu = '출입증 발급 신청 내역';
      matchedGroup = 'pending';
    } else if (location.pathname.includes('/patientlist')) {
      matchedMenu = '환자 정보 조회';
      matchedGroup = 'patient';
    } else if (location.pathname.includes('/patientdetail')) {
      matchedMenu = '환자 정보 조회';
      matchedGroup = 'patient';
    }


    if (matchedMenu && matchedGroup) {
      setSelectedMenu(matchedMenu);
      setSelectedGroup(matchedGroup);
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
        {isPassLogAvailable && (
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'dashboard' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('dashboard')}
          >
            {!isOpen ? (
              <div className="sidebar-collapsed-item" data-tooltip="대시보드">
                <IoMdHome className={`sidebar-menu-icon ${groupOpen.dashboard ? 'sidebar-menu-open' : ''}`} />
              </div>
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
              {['방문자 통계', '출입증 발급 현황'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'dashboard')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <div className="sidebar-collapsed-item" data-tooltip={menu}>
                      <img
                        src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                        alt="sidebar-icon"
                        className={`sidebar-collapsed-image ${selectedMenu !== menu ? 'gray-image' : ''}`}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
        )}

        {/* 환자 정보 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'patient' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('patient')}
          >
            {!isOpen ? (
              <div className="sidebar-collapsed-item" data-tooltip="환자 정보">
                <MdPersonalInjury className={`sidebar-menu-icon ${groupOpen.patient ? 'sidebar-menu-open' : ''}`} />
              </div>
            ) : (
              <>
                <span>환자 정보</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.patient ? <IoChevronDownOutline className="sidebar-chevron-icon" /> : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.patient && (
            <ul>
              {['환자 정보 조회'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'patient')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <div className="sidebar-collapsed-item" data-tooltip={menu}>
                      <img
                        src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                        alt="sidebar-icon"
                        className={`sidebar-collapsed-image ${selectedMenu !== menu ? 'gray-image' : ''}`}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* 출입증 발급 신청 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'pending' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('pending')}
          >
            {!isOpen ? (
              <div className="sidebar-collapsed-item" data-tooltip="출입증 발급">
                <MdBookOnline className={`sidebar-menu-icon ${groupOpen.pending ? 'sidebar-menu-open' : ''}`} />
              </div>
            ) : (
              <>
                <span>출입증 발급</span>
                <span style={{ marginLeft: 'auto' }}>
                  {groupOpen.pending ? <IoChevronDownOutline className="sidebar-chevron-icon" /> : <IoChevronForward className="sidebar-chevron-icon" />}
                </span>
              </>
            )}
          </div>
          {groupOpen.pending && (
            <ul>
              {['출입증 발급 신청 내역'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'pending')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <div className="sidebar-collapsed-item" data-tooltip={menu}>
                      <img
                        src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                        alt="sidebar-icon"
                        className={`sidebar-collapsed-image ${selectedMenu !== menu ? 'gray-image' : ''}`}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* 출입 로그 그룹 */}
        {isPassLogAvailable && (
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'access' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('access')}
          >
            {!isOpen ? (
              <div className="sidebar-collapsed-item" data-tooltip="출입 로그">
                <MdTextSnippet className={`sidebar-menu-icon ${groupOpen.access ? 'sidebar-menu-open' : ''}`} />
              </div>
            ) : (
              <>
                <span>출입 로그</span>
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
                    <div className="sidebar-collapsed-item" data-tooltip={menu}>
                      <img
                        src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                        alt="sidebar-icon"
                        className={`sidebar-collapsed-image ${selectedMenu !== menu ? 'gray-image' : ''}`}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
        )}

        {/* 관리페이지 그룹 */}
        <li className="sidebar-menu-group">
          <div
            className={`sidebar-menu-title ${selectedGroup === 'admin' ? 'sidebar-group-selected' : ''}`}
            onClick={() => toggleGroup('admin')}
          >
            {!isOpen ? (
              <div className="sidebar-collapsed-item" data-tooltip="관리페이지">
                <MdSettings className={`sidebar-menu-icon ${groupOpen.admin ? 'sidebar-menu-open' : ''}`} />
              </div>
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
              {['관리자 정보', '출입 정책'].map(menu => (
                <li
                  key={menu}
                  className={selectedMenu === menu ? 'selected' : ''}
                  onClick={() => handleMenuClick(menu, 'admin')}
                >
                  {isOpen ? (
                    <span>{menu}</span>
                  ) : (
                    <div className="sidebar-collapsed-item" data-tooltip={menu}>
                      <img
                        src={selectedMenu === menu ? SidebarButtonGreen : SidebarButtonGray}
                        alt="sidebar-icon"
                        className={`sidebar-collapsed-image ${selectedMenu !== menu ? 'gray-image' : ''}`}
                      />
                    </div>
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
