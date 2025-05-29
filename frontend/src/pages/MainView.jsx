import React from 'react'
import { RefreshProvider } from '../contexts/RefreshContext.jsx'
import { OverlayProvider } from '../contexts/OverlayContext.jsx'
import { WeekView } from '../components/WeekView.jsx'
import { RightBar } from '../components/Right Bar/RightBar.jsx'
import { Overlay } from '../components/Overlay.jsx'


export function  MainView() {
    return (
        <RefreshProvider>
        <OverlayProvider>
        <div className="bg-gray-100 dark:bg-gray-800 dark:text-white inset-0 columns-2 flex">
            <div className="min-h-screen max-w-[calc(85%)]">
            <h1 className="text-2xl font-bold text-center py-4 bg-gray-100 dark:bg-gray-800">My Weekly Planner</h1>
            <WeekView/>
            </div>
            <div className="min-h-screen max-w-[calc(15%)]">
            <RightBar/>
            </div>
        </div>
        <Overlay />
        </OverlayProvider>
        </RefreshProvider>
    );
}