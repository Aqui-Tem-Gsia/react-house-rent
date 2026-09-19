import type { ComponentType, SVGAttributes } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { MetricDelta as MetricDeltaValue } from "@/@types/admin/metrics";
import { MetricDelta } from "./metric-delta";

interface KpiCardProps {
  title: string;
  value: string;
  icon?: ComponentType<SVGAttributes<SVGElement>>;
  delta?: MetricDeltaValue;
  invertDelta?: boolean;
  hint?: string;
  compact?: boolean;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  delta,
  invertDelta,
  hint,
  compact,
}: KpiCardProps) {
  return (
    <Card className="gap-2">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
          {title}
          {Icon && <Icon className="size-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-1">
        <p className={cn("font-bold", compact ? "text-xl" : "text-3xl")}>
          {value}
        </p>

        {delta && <MetricDelta delta={delta} invert={invertDelta} />}

        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

export function KpiCardSkeleton({ compact }: { compact?: boolean }) {
  return (
    <Card className="gap-2">
      <CardHeader className="pb-0">
        <Skeleton className="h-4 w-24" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className={compact ? "h-6 w-20" : "h-8 w-32"} />
        <Skeleton className="h-3 w-28" />
      </CardContent>
    </Card>
  );
}
