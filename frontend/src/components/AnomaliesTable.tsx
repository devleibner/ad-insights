import { useAnomalies } from '@/lib/useAnomalies';
import React, { useState } from 'react';
import { Anomaly } from '../api/anomalies';
import { Badge } from '../components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

interface SortConfig {
  key: keyof Anomaly;
  direction: 'asc' | 'desc';
}

const AnomaliesTable: React.FC = () => {
  const [userIdFilter, setUserIdFilter] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'userId',
    direction: 'asc',
  });
  const { anomalies, loading, error, refetch } = useAnomalies({
    userId: userIdFilter ? Number(userIdFilter) : undefined,
    sortKey: sortConfig.key,
    sortDirection: sortConfig.direction,
  });

  const handleSort = (key: keyof Anomaly) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    refetch();
  };

  return (
    <Card className="mt-6 shadow-xl border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-2xl flex items-center gap-2 text-blue-900">
          <svg
            className="w-7 h-7 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Ad Anomalies
        </CardTitle>
        <CardDescription className="text-base text-blue-700">
          Flagged posts for short titles, duplicates, or suspiciously similar
          content. Filter and sort as needed.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="userId" className="font-medium text-blue-900">
            Filter by User ID:
          </label>
          <Input
            id="userId"
            type="number"
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value)}
            className="w-24 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="All"
          />
        </div>
        {loading ? (
          <Skeleton className="h-40 w-full rounded-xl" />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : anomalies.length === 0 ? (
          <div className="text-gray-400 italic">
            No anomalies found for this user.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead
                    className="cursor-pointer px-3 py-2 text-left text-blue-900 font-semibold"
                    onClick={() => handleSort('userId')}
                  >
                    User ID
                  </TableHead>
                  <TableHead
                    className="cursor-pointer px-3 py-2 text-left text-blue-900 font-semibold"
                    onClick={() => handleSort('id')}
                  >
                    Post ID
                  </TableHead>
                  <TableHead
                    className="cursor-pointer px-3 py-2 text-left text-blue-900 font-semibold"
                    onClick={() => handleSort('title')}
                  >
                    Title
                  </TableHead>
                  <TableHead className="px-3 py-2 text-left text-blue-900 font-semibold">
                    Reasons
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {anomalies.map((anomaly, idx) => (
                  <TableRow
                    key={anomaly.id}
                    className={
                      idx % 2 === 0
                        ? 'bg-white'
                        : 'bg-slate-50 hover:bg-blue-50 transition'
                    }
                  >
                    <TableCell className="px-3 py-2 text-center font-semibold text-blue-800">
                      {anomaly.userId}
                    </TableCell>
                    <TableCell className="px-3 py-2 text-center">
                      {anomaly.id}
                    </TableCell>
                    <TableCell
                      className="px-3 py-2 max-w-xs truncate"
                      title={anomaly.title}
                    >
                      {anomaly.title}
                    </TableCell>
                    <TableCell className="px-3 py-2">
                      {anomaly.reasons.map((r, i) => (
                        <Badge
                          key={i}
                          variant="destructive"
                          className="mr-1 mb-1 text-xs font-semibold shadow-sm animate-fade-in"
                        >
                          {r}
                        </Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnomaliesTable;
