import api from './api';
import { type Event } from '../types/event';

export const getAllEvents = async () => {
    const response = await api.get('/events');
    return response.data;
};

export const createEvent = async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
};

export const updateEvent = async (eventData: Event) => {
    const response = await api.put('/events', eventData);
    return response.data;
};

export const deleteEvent = async (eventId: string) => {
    await api.delete(`/events/${eventId}`);
};