import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/utils/format";
import {
  translateListingStatus,
  translateListingType,
} from "@/utils/translate";
import type { ListingType } from "@/@types/admin/listing-type";
import type { MetricsOperations } from "@/@types/admin/metrics";

interface TopListingsTableProps {
  listings: MetricsOperations["topViewedListings"];
}

export function TopListingsTable({ listings }: TopListingsTableProps) {
  if (listings.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Nenhum anúncio com visualizações ainda.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Anúncio</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Situação</TableHead>
          <TableHead>Cidade</TableHead>
          <TableHead className="text-right">Visualizações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell className="max-w-[280px] truncate font-medium">
              {listing.title}
            </TableCell>

            <TableCell>
              {translateListingType(listing.type as ListingType)}
            </TableCell>

            <TableCell>
              <Badge variant="secondary">
                {translateListingStatus(listing.status)}
              </Badge>
            </TableCell>

            <TableCell className="text-muted-foreground">
              {listing.city ? `${listing.city}/${listing.state}` : "—"}
            </TableCell>

            <TableCell className="text-right tabular-nums">
              {formatNumber(listing.views)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
