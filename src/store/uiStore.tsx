import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export interface ConfirmOptions {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
}

type ConfirmState = ConfirmOptions & {
    isOpen: boolean;
    resolve: ((value: boolean) => void) | null;
};

type UiState = {
    toasts: Toast[];
    confirm: ConfirmState;
    addToast: (message: string, type: ToastType) => void;
    removeToast: (id: string) => void;
    showConfirm: (options: ConfirmOptions) => Promise<boolean>;
    resolveConfirm: (value: boolean) => void;
};

const emptyConfirm = (): ConfirmState => ({
    isOpen: false,
    title: '',
    message: '',
    resolve: null,
});

export const useUiStore = create<UiState>((set, get) => ({
    toasts: [],
    confirm: emptyConfirm(),

    addToast: (message, type) => {
        const id = crypto.randomUUID();
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        window.setTimeout(() => get().removeToast(id), 4000);
    },

    removeToast: (id) => {
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
    },

    showConfirm: (options) =>
        new Promise((resolve) => {
            set({ confirm: { ...options, isOpen: true, resolve } });
        }),

    resolveConfirm: (value) => {
        const { resolve } = get().confirm;
        resolve?.(value);
        set({ confirm: emptyConfirm() });
    },
}));

export const toast = {
    success: (message: string) => useUiStore.getState().addToast(message, 'success'),
    error: (message: string) => useUiStore.getState().addToast(message, 'error'),
    info: (message: string) => useUiStore.getState().addToast(message, 'info'),
};

export const confirmAction = (options: ConfirmOptions) =>
    useUiStore.getState().showConfirm(options);
