import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import TablePage from './pages/TablePage'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'
import AdminMyPage from './pages/AdminMypage';
import IssueHistoryPage from './pages/IssueHistoryPage';

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/table" element={<TablePage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/mypage" element={<AdminMyPage/>} />
          <Route path="/issuehistory" element={<IssueHistoryPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
