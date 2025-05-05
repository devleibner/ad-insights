import { useSummary } from '@/lib/useSummary';
import React from 'react';
import { Badge } from '../components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import Tags from './Tags';

const SummaryPanel: React.FC = () => {
  const { summary, loading, error } = useSummary();

  return (
    <Card className="mt-6 shadow-xl border-0 bg-gradient-to-br from-white via-green-50 to-slate-100">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-2xl flex items-center gap-2 text-green-900">
          <svg
            className="w-7 h-7 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Summary
        </CardTitle>
        <CardDescription className="text-base text-green-700">
          Top users with the most unique words in their ad titles, and the most
          common words across all posts.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <Skeleton className="h-40 w-full rounded-xl" />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : summary ? (
          <>
            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-green-700">
                Top 3 Users by Unique Words in Titles
              </h3>
              <ul className="list-none pl-0 flex flex-col gap-2">
                {summary.top_users.map((user) => (
                  <li key={user.userId} className="mb-1">
                    <span className="font-bold text-green-800">
                      User {user.userId}
                    </span>
                    : {user.unique_word_count} unique words
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.unique_words.map((w) => (
                        <Badge
                          key={w}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {w}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-green-700">
                Most Common Words in Titles
              </h3>
              <Tags words={summary.common_words} />
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default SummaryPanel;
