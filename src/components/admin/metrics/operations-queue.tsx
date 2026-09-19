import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CircleDollarSign,
  Clock,
  Megaphone,
  ShoppingCart,
  Timer,
} from "lucide-react";
import type { ComponentType, SVGAttributes } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatAge, formatNumber } from "@/utils/format";
import type { MetricsOperations } from "@/@types/admin/metrics";

type Severity = "critical" | "warning" | "neutral";

interface QueueItem {
  label: string;
  value: number;
  hint: string | null;
  icon: ComponentType<SVGAttributes<SVGElement>>;
  to?: string;
  severity: Severity;
}

// Status nunca é só cor: cada cartão leva ícone e rótulo.
const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "text-[#d03b3b]",
  warning: "text-[#b57b00]",
  neutral: "text-muted-foreground",
};

function severityFor(value: number, threshold: number): Severity {
  if (value === 0) return "neutral";

  return value >= threshold ? "critical" : "warning";
}

function buildItems(queue: MetricsOperations["queue"]): QueueItem[] {
  return [
    {
      label: "Aguardando revisão",
      value: queue.pendingReview,
      hint: formatAge(queue.oldestPendingReviewAt),
      icon: Megaphone,
      to: "/admin/ads",
      severity: severityFor(queue.pendingReview, 10),
    },
    {
      label: "Reembolsos pendentes",
      value: queue.pendingRefunds,
      hint: formatAge(queue.oldestPendingRefundAt),
      icon: CircleDollarSign,
      to: "/admin/refunds",
      severity: severityFor(queue.pendingRefunds, 5),
    },
    {
      label: "Expiram em 7 dias",
      value: queue.expiringIn7Days,
      hint: "anúncios ativos",
      icon: Timer,
      severity: "neutral",
    },
    {
      label: "Ativos já vencidos",
      value: queue.staleActive,
      // A expiração só roda quando o dono abre a lista dele, então esses
      // anúncios seguem marcados como ativos sem aparecer na busca.
      hint: "ainda marcados como ativos",
      icon: AlertTriangle,
      severity: severityFor(queue.staleActive, 20),
    },
    {
      label: "Checkout abandonado",
      value: queue.abandonedCheckout,
      hint: "sem pagar há +24h",
      icon: ShoppingCart,
      severity: "neutral",
    },
  ];
}

function QueueCard({ item }: { item: QueueItem }) {
  const { icon: Icon } = item;

  const content = (
    <CardContent className="flex items-center gap-3 px-4">
      <Icon className={cn("size-5 shrink-0", SEVERITY_STYLES[item.severity])} />

      <div className="min-w-0 space-y-0.5">
        <p className="text-2xl font-bold leading-none">
          {formatNumber(item.value)}
        </p>
        <p className="truncate text-xs font-medium">{item.label}</p>
        {item.hint && (
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            {item.hint.startsWith("há") && <Clock className="size-3" />}
            {item.hint}
          </p>
        )}
      </div>
    </CardContent>
  );

  if (!item.to) {
    return <Card className="py-4">{content}</Card>;
  }

  return (
    <Card className="py-4 transition-colors hover:bg-muted/50">
      <Link to={item.to} className="block">
        {content}
      </Link>
    </Card>
  );
}

export function OperationsQueue({ data }: { data: MetricsOperations }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {buildItems(data.queue).map((item) => (
        <QueueCard key={item.label} item={item} />
      ))}
    </div>
  );
}

export function OperationsQueueSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="py-4">
          <CardContent className="flex items-center gap-3 px-4">
            <Skeleton className="size-5 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
