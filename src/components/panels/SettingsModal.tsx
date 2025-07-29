import { useRef, useEffect } from "react"

const SettingsModal = ({ isDialogOpen, setIsDialogOpen }: { isDialogOpen: boolean, setIsDialogOpen: (value: boolean) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isDialogOpen) handleOpen()
    }, [isDialogOpen])

    const handleOpen = () => dialogRef.current?.showModal()
    const handleClose = () => {
        dialogRef.current?.close()
        setIsDialogOpen(false)
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
        <dialog className="settings-modal" ref={dialogRef} onClick={hanleClickOutside} aria-labelledby="modal-title" aria-describedby="modal-content">
        </dialog>
    )
}

export default SettingsModal