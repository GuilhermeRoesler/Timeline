import axios from "axios";
import { create } from "zustand";

type GlobalConfigState = {
    api: ReturnType<typeof axios.create>;
}

export const useGlobalConfigStore = create<GlobalConfigState>(() => ({
    api: axios.create({
        baseURL: 'http://localhost:8000/',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}))