import api from './api';
import { type Period } from '../types/period';

export const getAllPeriods = async () => {
    const response = await api.get('/periods');
    return response.data;
};

export const createPeriod = async (periodData) => {
    const response = await api.post('/periods', periodData);
    return response.data;
};

export const updatePeriod = async (periodData: Period) => {
    const response = await api.put('/periods', periodData);
    return response.data;
};

export const deletePeriod = async (periodId: string) => {
    await api.delete(`/periods/${periodId}`);
};