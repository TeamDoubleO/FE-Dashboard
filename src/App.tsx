import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TablePage from './pages/TablePage';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminMyPage from './pages/AdminMypage';
import IssueHistoryPage from './pages/IssueHistoryPage';
import EntryHistoryPage from './pages/EntryHistoryPage';
import IssueDetailPage from './pages/IssueDetailPage';
import PrivateRoute from './contexts/PrivateRoute';

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
          <Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/admin/mypage" element={<AdminMyPage />} />
          <Route path="/issuehistory" element={<IssueHistoryPage />} />
          <Route path="/issuedetail/:requestId" element={<IssueDetailPage />} />
          <Route path="/entryhistory" element={<EntryHistoryPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
