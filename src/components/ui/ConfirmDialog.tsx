import { useUiStore } from '../../store/uiStore';

const ConfirmDialog = () => {
    const confirm = useUiStore((state) => state.confirm);
    const resolveConfirm = useUiStore((state) => state.resolveConfirm);

    if (!confirm.isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-gray-900">{confirm.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{confirm.message}</p>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        onClick={() => resolveConfirm(false)}
                        className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                        {confirm.cancelLabel ?? 'Cancelar'}
                    </button>
                    <button
                        onClick={() => resolveConfirm(true)}
                        className={`rounded-lg px-4 py-2 text-white ${
                            confirm.destructive
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {confirm.confirmLabel ?? 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
