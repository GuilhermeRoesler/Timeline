import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUiStore } from '@/store/uiStore';

const ConfirmDialog = () => {
    const confirm = useUiStore((state) => state.confirm);
    const resolveConfirm = useUiStore((state) => state.resolveConfirm);

    return (
        <AlertDialog
            open={confirm.isOpen}
            onOpenChange={(open) => {
                if (!open) resolveConfirm(false);
            }}
        >
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>{confirm.title}</AlertDialogTitle>
                    <AlertDialogDescription>{confirm.message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => resolveConfirm(false)}>
                        {confirm.cancelLabel ?? 'Cancelar'}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        variant={confirm.destructive ? 'destructive' : 'default'}
                        onClick={() => resolveConfirm(true)}
                    >
                        {confirm.confirmLabel ?? 'Confirmar'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;
