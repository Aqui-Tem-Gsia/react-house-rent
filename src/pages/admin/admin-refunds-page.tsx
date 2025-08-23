import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRefundRequests } from '@/hooks/use-refund-requests';
import { formatPrice } from '@/utils/format';
import { translateListingType } from '@/utils/translate';

export const AdminRefundsPage = () => {
  const { data, isLoading } = useRefundRequests();

  if (isLoading) {
    return <div className="p-8 text-center">Carregando solicitações...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center">
        Nenhuma solicitação de reembolso encontrada.
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Solicitações de Reembolso</h1>

      <div className="flex gap-4 flex-wrap">
        {data.map((refund) => (
          <Card
            key={refund.id}
            className="w-full max-w-[530px] shadow-lg rounded-2xl"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  {refund.listing.title}
                </CardTitle>

                <Badge variant="secondary">
                  {translateListingType(refund.listing.type)}
                </Badge>
              </div>

              <p className="text-neutral-500">
                {refund.listing.address.street}, {refund.listing.address.number}
                , {refund.listing.address.neighborhood},{' '}
                {refund.listing.address.city} - {refund.listing.address.state}
              </p>
            </CardHeader>

            <Separator />

            <CardContent>
              <p>
                <strong>Solicitado por:</strong> {refund.userName}
              </p>

              <p className="text-neutral-500">{refund.userEmail}</p>

              <Separator className="my-4" />

              <p>
                <strong>Plano:</strong> {refund.listing.planName}
              </p>

              <p>
                <strong>Valor a reembolsar:</strong>{' '}
                {formatPrice(refund.listing.valueToRefund, refund.listing.type)}
              </p>

              <p>
                <strong>Último pagamento:</strong>{' '}
                {new Date(refund.listing.lastPaymentDate).toLocaleDateString()}
              </p>

              <Separator className="mt-4 mb-2" />

              <p>
                <strong>Motivo:</strong> {refund.reason}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between gap-2">
              <Button
                onClick={() => {}}
                variant="destructive"
                className="flex-1 gap-2 cursor-pointer p-2"
              >
                Rejeitar
              </Button>

              <Button
                onClick={() => {}}
                className="flex-1 text-white gap-2 cursor-pointer p-2"
              >
                Aprovar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
