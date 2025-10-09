import { useRef, useEffect } from "react"
import SettingsSidebar from "./SettingsSidebar";
import SettingsBody from "./SettingsBody";
import { useSettingsStore } from "../../../store/settingsStore";
import { X } from "lucide-react";

const SettingsModal = ({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean, setIsDialogOpen: (value: boolean) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) handleOpen()
    }, [isDialogOpen])

    const handleOpen = () => dialogRef.current?.showModal()
    const handleClose = () => {
        dialogRef.current?.close()
        setIsDialogOpen(false)
        useSettingsStore.getState().saveSettings();
    }

    const hanleClickOutside = (e: React.MouseEvent) => {
        const rect = dialogRef.current?.getBoundingClientRect()
        if (!rect) return

        const clickedOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom

        if (clickedOutside) handleClose()
    }

    return (
        <dialog className="settings-modal" ref={dialogRef} onClick={hanleClickOutside}
            aria-labelledby="modal-title" aria-describedby="modal-content">
            <button onClick={handleClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
            </button>
            <SettingsSidebar />
            <SettingsBody />
        </dialog>
    )
}

export default SettingsModal