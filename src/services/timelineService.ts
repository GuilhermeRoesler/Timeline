import api from './api';

type ColorizePayload = Record<string, unknown>;

export const colorizeTimeline = async (periods: ColorizePayload[], events: ColorizePayload[]) => {
    await api.put('/timeline/colorize', { periods, events });
};
