import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import TablePage from './pages/TablePage';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminMyPage from './pages/AdminMypage';
import IssueHistoryPage from './pages/IssueHistoryPage';
import EntryHistoryPage from './pages/EntryHistoryPage';
import IssueDetailPage from './pages/IssueDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* 첫 진입 시 /dashboard로 */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/table" element={<TablePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/mypage" element={<AdminMyPage />} />
        <Route path="/issuehistory" element={<IssueHistoryPage />} />
        <Route path="/issuedetail/:passId" element={<IssueDetailPage />} />
        <Route path="/entryhistory" element={<EntryHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
