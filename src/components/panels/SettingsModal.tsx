import { useRef, useEffect } from "react"
import SettingsSidebar from "./SettingsSidebar";
import SettingsBody from "./SettingsBody";
import { useSettingsStore } from "../../store/settingsStore";

const SettingsModal = ({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean, setIsDialogOpen: (value: boolean) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) handleOpen()
    }, [isDialogOpen])

    const handleOpen = () => dialogRef.current?.showModal()
    const handleClose = () => {
        dialogRef.current?.close()
        setIsDialogOpen(false)
        useSettingsStore.getState().saveSettingsToLocalStorage();
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
            <i className="fa-solid fa-xmark" onClick={handleClose}></i>
            <SettingsSidebar />
            <SettingsBody />
        </dialog>
    )
}

export default SettingsModal