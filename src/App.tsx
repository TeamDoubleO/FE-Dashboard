import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import DashboardStats from './pages/DashboardStats'
import DashboardPass from './pages/DashboardPass'
import AdminLogin from './pages/AdminLogin';
import AdminMyPage from './pages/AdminMypage';
import IssueHistoryPage from './pages/IssueHistoryPage';
import EntryHistoryPage from './pages/EntryHistoryPage';
import IssueDetailPage from './pages/IssueDetailPage';
import PrivateRoute from './contexts/PrivateRoute';
import AdminPasswordPage from './pages/AdminPasswordPage';
import AdminAccessPolicyPage from './pages/AdminAccessPolicyPage';
import PatientListPage from './pages/PatientListPage';
import PatientDetailPage from './pages/PatientDetailPage';
import PassPendingPage from './pages/PassPendingPage';
import PendingDetailPage from './pages/PendingDetailPage';
import WarningPage from './pages/WarningPage';

function App() {
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('reloaded', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* 로그인 안했을 경우 홈으로 접근 시 로그인 페이지로 이동 */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* 로그인 페이지 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 보호된 라우트 그룹 */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboardstats" element={<DashboardStats />} />
          <Route path="/dashboardpass" element={<DashboardPass />} />
          <Route path="/admin/mypage" element={<AdminMyPage />} />
          <Route path="/passpending" element={<PassPendingPage />} />
          <Route path="/pendingdetail/:pendingId" element={<PendingDetailPage />} />
          <Route path="/issuehistory" element={<IssueHistoryPage />} />
          <Route path="/issuedetail/:requestId" element={<IssueDetailPage />} />
          <Route path="/entryhistory" element={<EntryHistoryPage />} />
          <Route path="/patientlist" element={<PatientListPage />} />
          <Route path="/patientdetail/:patientId" element={<PatientDetailPage />} />
          <Route path="/adminpassword" element={<AdminPasswordPage />} />
          <Route path="/admin/accesspolicy" element={<AdminAccessPolicyPage />} />
          <Route path="/warning" element={<WarningPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
