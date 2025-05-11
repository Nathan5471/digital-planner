import { parseISO } from 'date-fns';

const sortEventsByDate = (events) => {
    return events.sort((a, b) => {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        return dateA - dateB;
    });
}

export default sortEventsByDate;