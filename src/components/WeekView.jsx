import React, { useState } from 'react';
import { startOfWeek, addDays, format } from 'date-fns';
import { DayColumn } from './DayColumn.jsx';

export function WeekView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday as the first day of the week
    const days = Array.from({ length: 7 }, (_, index) => addDays(startOfWeekDate, index));

    return (
        <div className="items-center p-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setCurrentDate(addDays(currentDate, -7))}>Previous Week</button>
                <h2 className="text-lg font-bold mb-4">{format(startOfWeekDate, 'EEEE')} {format(startOfWeekDate, 'MM/dd/yyyy')} - {format(days[6], 'EEEE')} {format(days[6], 'MM/dd/yyyy')}</h2>
                <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setCurrentDate(addDays(currentDate, 7))}>Next Week</button>
            </div>
            <div className="min-h-[calc(90%)] grid grid-cols-7 gap-1">
                {days.map((day) => (
                    <DayColumn key={format(day, "yyyy-MM-dd")} date={day} />
                ))}
            </div>
        </div>
    )
}