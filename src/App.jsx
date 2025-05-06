import React, { useState, useCallback } from 'react'
import './App.css'
import { RefreshProvider } from './contexts/RefreshContext.jsx'
import { OverlayProvider } from './contexts/OverlayContext.jsx'
import { WeekView } from './components/WeekView.jsx'
import { RightBar } from './components/Right Bar/RightBar.jsx'
import { Overlay } from './components/Overlay.jsx'

function App() {
  return (
    <RefreshProvider>
    <OverlayProvider>
      <div className="bg-gray-100 columns-2 flex">
        <div className="min-h-screen max-w-[calc(85%)]">
          <h1 className="text-2xl font-bold text-center py-4 bg-gray-100">My Weekly Planner</h1>
          <WeekView/>
        </div>
        <div className="min-h-screen max-w-[calc(15%)]">
          <RightBar/>
        </div>
      </div>
      <Overlay />
    </OverlayProvider>
    </RefreshProvider>
  )
}

export default App
