import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import DashboardSample from './pages/DashboardSample';
import AdminLogin from './pages/AdminLogin';
import AdminMyPage from './pages/AdminMypage';
import IssueHistoryPage from './pages/IssueHistoryPage';
import EntryHistoryPage from './pages/EntryHistoryPage';
import IssueDetailPage from './pages/IssueDetailPage';
import PrivateRoute from './contexts/PrivateRoute';
import AdminPasswordPage from './pages/AdminPasswordPage';
import AdminAccessPolicyPage from './pages/AdminAccessPolicyPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 안했을 경우 홈으로 접근 시 로그인 페이지로 이동 */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* 로그인 페이지 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 보호된 라우트 그룹 */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardsample" element={<DashboardSample />} />
          <Route path="/admin/mypage" element={<AdminMyPage />} />
          <Route path="/issuehistory" element={<IssueHistoryPage />} />
          <Route path="/issuedetail/:requestId" element={<IssueDetailPage />} />
          <Route path="/entryhistory" element={<EntryHistoryPage />} />
          <Route path="/adminpassword" element={<AdminPasswordPage />} />
          <Route path="/admin/accesspolicy" element={<AdminAccessPolicyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
