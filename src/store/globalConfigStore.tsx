import axios from "axios";
import { create } from "zustand";

type GlobalConfigState = {
    api: ReturnType<typeof axios.create>;
    setAuthToken: (token: string | null) => void;
}

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const useGlobalConfigStore = create<GlobalConfigState>(() => ({
    api: api,
    setAuthToken: (token: string | null) => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);
        } else {
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
        }
    }
}))