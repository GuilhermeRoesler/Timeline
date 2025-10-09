import api from './api';

export const getSettings = async () => {
    const response = await api.get('/settings');
    return response.data;
};

export const updateSettings = async (settingsData) => {
    await api.put('/settings', settingsData);
};

export const resetSettings = async (settingsData) => {
    await api.post('/settings', settingsData);
};