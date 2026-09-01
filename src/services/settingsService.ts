import api from './api';
import type { Settings } from '../types/settings';

export const getSettings = async () => {
    const response = await api.get('/settings');
    return response.data;
};

export const updateSettings = async (settingsData: Settings) => {
    await api.put('/settings', settingsData);
};

export const resetSettings = async (settingsData: Settings) => {
    await api.post('/settings', settingsData);
};
