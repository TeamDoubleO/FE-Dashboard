import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import TablePage from './pages/TablePage'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/table" element={<TablePage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
