const sortEventsByDate = (events) => {
    return events.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        return dateA - dateB;
    });
}

export default sortEventsByDate;