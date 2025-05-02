import React, { useState, useCallback } from 'react'
import './App.css'
import { OverlayProvider } from './contexts/OverlayContext.jsx'
import { WeekView } from './components/WeekView.jsx'
import { RightBar } from './components/RightBar.jsx'
import { Overlay } from './components/Overlay.jsx'

function App() {
  const [refreshToggle, setRefreshToggle] = useState(false);

  const triggerRefresh = useCallback(() => {
    setRefreshToggle((prev) => !prev);
  }, []);

  return (
    <OverlayProvider>
      <div className="bg-gray-100 columns-2 flex">
        <div className="min-h-screen max-w-[calc(95%)]">
          <h1 className="text-2xl font-bold text-center py-4 bg-gray-100">My Weekly Planner</h1>
          <WeekView refresh={refreshToggle}/>
        </div>
        <div className="min-h-screen max-w-[calc(5%)]">
          <RightBar triggerRefresh={triggerRefresh}/>
        </div>
      </div>
      <Overlay />
    </OverlayProvider>
  )
}

export default App
