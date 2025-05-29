import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { getEventIdsByType } from '../../utils/EventAPIHandler.js';
import { useRefreshContext } from '../../contexts/RefreshContext.jsx';
import { ShowEventSmall } from './ShowEventSmall.jsx';

export function UpcomingProjects() {
    const { refreshToggle } = useRefreshContext();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const refresh = refreshToggle

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectIds = await getEventIdsByType('Project', format(new Date(), 'yyyy-MM-dd'));
                if (projectIds.length > 3) {
                    projectIds.length = 3;
                }
                setProjects(projectIds);
            } catch (error) {
                console.error("Error fetching projects:", error);
                return [];
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, [refresh]);

    if (loading === true) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
                <h3 className="text-pretty font-bold items-center">Upcoming Projects</h3>
                <p className="text-gray-500">No upcoming projects</p>
            </div>
        );
    }

    return (
        <div className="border dark:border-gray-700 p-4 rounded-lg shadow-md bg-white dark:bg-gray-700">
            <h3 className="text-pretty font-bold items-center">Upcoming Projects</h3>
            {projects.map((event) => (
                <ShowEventSmall key={event} eventId={event} />
            ))}
        </div>
    )
}