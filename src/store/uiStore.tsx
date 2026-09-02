import { create } from 'zustand';
import { toast as sonnerToast } from 'sonner';

export type ToastType = 'success' | 'error' | 'info';

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
    confirm: ConfirmState;
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
    confirm: emptyConfirm(),

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
    success: (message: string) => sonnerToast.success(message),
    error: (message: string) => sonnerToast.error(message),
    info: (message: string) => sonnerToast.info(message),
};

export const confirmAction = (options: ConfirmOptions) =>
    useUiStore.getState().showConfirm(options);
