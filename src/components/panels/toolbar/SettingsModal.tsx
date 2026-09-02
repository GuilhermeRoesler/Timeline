import SettingsSidebar from './SettingsSidebar';
import SettingsBody from './SettingsBody';
import { useSettingsStore } from '@/store/settingsStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type SettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
    const handleClose = () => {
        useSettingsStore.getState().saveSettings();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent
                showCloseButton
                className="flex h-[min(90vh,640px)] w-full max-w-3xl flex-row gap-0 overflow-hidden p-0 sm:max-w-3xl"
            >
                <SettingsSidebar onClose={handleClose} />
                <div className="relative flex min-w-0 flex-1 flex-col">
                    <SettingsBody />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsModal;
