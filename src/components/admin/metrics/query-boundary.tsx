import type { ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QueryLike<T> {
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  data: T | undefined;
  refetch: () => void;
}

interface QueryBoundaryProps<T> {
  query: QueryLike<T>;
  skeleton: ReactNode;
  children: (data: T) => ReactNode;
}

function MetricsError({
  onRetry,
  isRetrying,
}: {
  onRetry: () => void;
  isRetrying: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
      <AlertCircle className="size-5 text-[#d03b3b]" />

      <p className="text-sm font-medium">Não foi possível carregar</p>
      <p className="max-w-xs text-xs text-muted-foreground">
        Verifique se a API está no ar e tente de novo.
      </p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onRetry}
        disabled={isRetrying}
      >
        <RefreshCw className={isRetrying ? "size-4 animate-spin" : "size-4"} />
        Tentar de novo
      </Button>
    </div>
  );
}

/**
 * Sem isso, uma requisição que falha cai no mesmo ramo do carregamento
 * (isPending falso, data indefinida) e a seção fica em esqueleto para sempre,
 * sem dizer que houve erro.
 */
export function QueryBoundary<T>({
  query,
  skeleton,
  children,
}: QueryBoundaryProps<T>) {
  if (query.isError) {
    return (
      <MetricsError onRetry={query.refetch} isRetrying={query.isFetching} />
    );
  }

  if (query.isPending || !query.data) {
    return <>{skeleton}</>;
  }

  return <>{children(query.data)}</>;
}
