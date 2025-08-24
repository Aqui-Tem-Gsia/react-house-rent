'use client';

import type { RefundRequestStatus } from '@/@types/admin/refund-request';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateRefundRequestStatus } from '@/hooks/use-refund-requests';
import { toast } from 'sonner';

interface RefundConfirmationModalProps {
  isOpen: boolean;
  refundId: string;
  status: RefundRequestStatus;
  onClose: () => void;
}

export function RefundConfirmationModal({
  isOpen,
  refundId,
  status,
  onClose,
}: RefundConfirmationModalProps) {
  const { mutateAsync: updateRefundRequestStatus, isPending } =
    useUpdateRefundRequestStatus();

  const handleConfirm = async () => {
    try {
      await updateRefundRequestStatus({ id: refundId, status });
      toast.success(
        status === 'APPROVED'
          ? 'Solicitação aprovada com sucesso!'
          : 'Solicitação rejeitada com sucesso!'
      );

      onClose();
    } catch (error) {
      toast.error('Ocorreu um erro.' + error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {status === 'APPROVED' ? 'Aprovar' : 'Rejeitar'} solicitação de
            reembolso?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {status === 'APPROVED'
              ? 'Ao aprovar essa solicitação de reembolso, o anunciante receberá o valor pago de volta e o anúncio será removido do aplicativo.'
              : 'Tem certeza de que deseja rejeitar essa solicitação de reembolso?'}
          </p>

          <p className="text-sm text-muted-foreground">
            O usuário receberá um e-mail com a sua decisão.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>

          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? 'Enviando...' : 'Confirmar decisão'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
