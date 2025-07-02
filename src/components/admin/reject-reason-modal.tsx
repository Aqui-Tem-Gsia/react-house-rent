"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  listingTitle: string;
}

export function RejectReasonModal({
  isOpen,
  onClose,
  onConfirm,
  listingTitle,
}: RejectReasonModalProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await onConfirm(reason.trim());
      setReason("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <DialogTitle>Rejeitar Anúncio</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Você está prestes a rejeitar o anúncio:
          </p>
          <p className="font-medium text-sm bg-muted p-3 rounded-md">
            {listingTitle}
          </p>

          <div className="space-y-2">
            <Label htmlFor="reason">
              Motivo da rejeição <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="Descreva o motivo da rejeição do anúncio..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Este motivo será enviado para o anunciante por email.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? "Rejeitando..." : "Confirmar Rejeição"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
