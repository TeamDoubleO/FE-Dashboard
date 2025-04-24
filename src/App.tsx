import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useState } from 'react'

import TablePage from './pages/TablePage'

function App() {

  return (
    <>
    <Router>
        <Routes>
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
