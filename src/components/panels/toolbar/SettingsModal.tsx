import SettingsSidebar from './SettingsSidebar';
import SettingsBody from './SettingsBody';
import { useSettingsStore } from '../../../store/settingsStore';
import { X } from 'lucide-react';

type SettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    if (!isOpen) return null;

    const handleClose = () => {
        useSettingsStore.getState().saveSettings();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4"
            onClick={handleClose}
        >
            <div
                className="flex h-[min(90vh,640px)] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <SettingsSidebar onClose={handleClose} />
                <div className="relative flex min-w-0 flex-1 flex-col">
                    <button
                        onClick={handleClose}
                        className="absolute top-3 right-3 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Fechar configurações"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <SettingsBody />
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
