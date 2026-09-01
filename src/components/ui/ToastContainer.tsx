import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUiStore, type ToastType } from '../../store/uiStore';

const styles: Record<ToastType, string> = {
    success: 'border-green-200 bg-green-50 text-green-900',
    error: 'border-red-200 bg-red-50 text-red-900',
    info: 'border-blue-200 bg-blue-50 text-blue-900',
};

const ToastContainer = () => {
    const toasts = useUiStore((state) => state.toasts);
    const removeToast = useUiStore((state) => state.removeToast);

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
            {toasts.map((toast) => {
                const Icon =
                    toast.type === 'success'
                        ? CheckCircle2
                        : toast.type === 'error'
                          ? AlertCircle
                          : Info;
                return (
                    <div
                        key={toast.id}
                        className={`flex min-w-[280px] max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles[toast.type]}`}
                    >
                        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                        <p className="flex-1 text-sm">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="rounded p-0.5 opacity-60 hover:opacity-100"
                            aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ToastContainer;
