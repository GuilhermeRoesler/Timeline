export const addPeriod = (e: React.FormEvent<HTMLFormElement>) => {
    const periods = localStorage.getItem('periods');
    const newPeriod = {
        title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
        description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
        start: Number((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value),
        end: Number((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value),
        color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
    }

    if (periods) {
        const periodsArray = JSON.parse(periods);
        periodsArray.push(newPeriod);
        localStorage.setItem('periods', JSON.stringify(periodsArray));
    } else {
        localStorage.setItem('periods', JSON.stringify([newPeriod]));
    }
    window.location.reload();
}

export const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
    const events = localStorage.getItem('events');
    const newEvent = {
        title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
        description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
        year: Number((e.currentTarget.elements.namedItem('year') as HTMLInputElement).value),
        color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
    }

    if (events) {
        const eventsArray = JSON.parse(events);
        eventsArray.push(newEvent);
        localStorage.setItem('events', JSON.stringify(eventsArray));
    } else {
        localStorage.setItem('events', JSON.stringify([newEvent]));
    }
    window.location.reload();
}