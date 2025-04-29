import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import TablePage from './pages/TablePage'
import Dashboard from './pages/Dashboard'
import AdminLogin from './pages/AdminLogin'

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/table" element={<TablePage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
