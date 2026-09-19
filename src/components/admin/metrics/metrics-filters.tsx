import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ListingTypeFilter } from "@/@types/admin/metrics";
import {
  formatRangeLabel,
  parseIsoDay,
  rangeFromPreset,
  toIsoDay,
  type MetricsRange,
} from "@/utils/metrics-range";

interface MetricsFiltersProps {
  range: MetricsRange;
  listingType?: ListingTypeFilter;
  onRangeChange: (range: MetricsRange) => void;
  onListingTypeChange: (listingType?: ListingTypeFilter) => void;
}

const PRESETS = [
  { label: "Hoje", days: 0 },
  { label: "7 dias", days: 7 },
  { label: "30 dias", days: 30 },
  { label: "90 dias", days: 90 },
] as const;

const LISTING_TYPES: Array<{ label: string; value?: ListingTypeFilter }> = [
  { label: "Todos", value: undefined },
  { label: "Aluguel", value: "RENT" },
  { label: "Venda", value: "SALE" },
];

export function MetricsFilters({
  range,
  listingType,
  onRangeChange,
  onListingTypeChange,
}: MetricsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center rounded-md border p-0.5">
        {LISTING_TYPES.map(({ label, value }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={listingType === value}
            className={cn(
              "h-7 px-3 text-xs",
              listingType === value && "bg-muted font-semibold",
            )}
            onClick={() => onListingTypeChange(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <CalendarIcon className="size-4" />
            {formatRangeLabel(range)}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col gap-1 p-2">
            {PRESETS.map(({ label, days }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                size="sm"
                className="justify-start"
                onClick={() => onRangeChange(rangeFromPreset(days))}
              >
                {label}
              </Button>
            ))}
          </div>

          <Separator />

          <Calendar
            mode="range"
            defaultMonth={parseIsoDay(range.from)}
            selected={{
              from: parseIsoDay(range.from),
              to: parseIsoDay(range.to),
            }}
            onSelect={(selected) => {
              if (!selected?.from) return;

              onRangeChange({
                from: toIsoDay(selected.from),
                to: toIsoDay(selected.to ?? selected.from),
              });
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
