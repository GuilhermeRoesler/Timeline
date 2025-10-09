import { create } from "zustand";

type GlobalConfigState = {
    authToken: string | null;
    setAuthToken: (token: string | null) => void;
}

export const useGlobalConfigStore = create<GlobalConfigState>((set) => ({
    authToken: null,
    setAuthToken: (token: string | null) => {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
        set({ authToken: token });
    }
}))