import React from 'react'
import { WeekView } from '../components/WeekView.jsx'
import { RightBar } from '../components/Right Bar/RightBar.jsx'
import { Overlay } from '../components/Overlay.jsx'


export function  MainView() {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 dark:text-white inset-0 columns-2 flex">
            <div className="min-h-screen max-w-[calc(85%)]">
            <h1 className="text-2xl font-bold text-center py-4 bg-gray-100 dark:bg-gray-800">My Weekly Planner</h1>
            <WeekView/>
            </div>
            <div className="min-h-screen max-w-[calc(15%)]">
            <RightBar/>
            </div>
        </div>
    );
}