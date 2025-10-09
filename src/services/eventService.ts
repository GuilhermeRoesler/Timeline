import api from './api';

type EventPayload = {
    title: string;
    description: string;
    image: string;
    color: string;
    event_date: string;
};

export const getAllEvents = async () => {
    const response = await api.get('/events');
    return response.data;
};

export const createEvent = async (eventData: EventPayload) => {
    const response = await api.post('/events', eventData);
    return response.data;
};

export const updateEvent = async (eventId: string, eventData: EventPayload) => {
    const response = await api.put(`/events/${eventId}`, eventData);
    return response.data;
};

export const deleteEvent = async (eventId: string) => {
    await api.delete(`/events/${eventId}`);
};