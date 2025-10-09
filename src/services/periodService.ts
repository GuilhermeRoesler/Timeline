import api from './api';

// Type for the data payload when creating/updating a period
type PeriodPayload = {
    id: string | null;
    title: string;
    description: string;
    image: string;
    color: string;
    start_date: string;
    end_date: string;
    level: number;
};

export const getAllPeriods = async () => {
    const response = await api.get('/periods');
    return response.data;
};

export const createPeriod = async (periodData: Omit<PeriodPayload, 'level'> & { level: number }) => {
    const response = await api.post('/periods', periodData);
    return response.data;
};

export const updatePeriod = async (periodData: PeriodPayload) => {
    const response = await api.put(`/periods/${periodData.id}`, periodData);
    return response.data;
};

export const deletePeriod = async (periodId: string) => {
    await api.delete(`/periods/${periodId}`);
};