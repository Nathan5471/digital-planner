import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainView } from './pages/MainView.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { useDarkMode } from './hooks/UseDarkMode.js'


function App() {
  const { isDarkMode } = useDarkMode()
  return (
    <div className={isDarkMode ? 'dark' : 'light'}>
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
