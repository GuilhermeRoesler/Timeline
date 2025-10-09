import api from './api';

export const colorizeTimeline = async (periods, events) => {
    await api.put('/timeline/colorize', { periods, events });
};