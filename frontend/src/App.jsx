import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { RefreshProvider } from './contexts/RefreshContext.jsx'
import { OverlayProvider } from './contexts/OverlayContext.jsx'
import { Overlay } from './components/Overlay.jsx'
import { MainView } from './pages/MainView.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignUpPage } from './pages/SignUpPage.jsx'
import { SettingsPage } from './pages/SettingsPage.jsx'
import { useDarkMode } from './hooks/UseDarkMode.js'


function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  return (
    <RefreshProvider>
    <OverlayProvider>
    <div className={isDarkMode ? 'dark' : 'light'}>
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/settings" element={<SettingsPage toggleDarkMode={toggleDarkMode}/>} />
      </Routes>
    </Router>
    <Overlay />
    </div>
    </OverlayProvider>
    </RefreshProvider>
  )
}

export default App
