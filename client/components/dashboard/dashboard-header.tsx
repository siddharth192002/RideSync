"use client";

import { RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IndexStatus } from "@/lib/api";

type FilterStatus = "ALL" | IndexStatus;

type DashboardHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
  visibility: "all" | "public" | "private";
  onVisibilityChange: (value: "all" | "public" | "private") => void;
  status: FilterStatus;
  onStatusChange: (value: FilterStatus) => void;
  totalCount?: number;
  readyCount: number;
  onSync: () => void;
  isSyncing: boolean;
};

export function DashboardHeader({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
  status,
  onStatusChange,
  totalCount = 0,
  readyCount,
  onSync,
  isSyncing,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border/70 px-4 py-4 md:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold">Repositories</h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} connected, {readyCount} ready to chat
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative min-w-0 sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search repositories"
              aria-label="Search repositories"
              className="pl-9"
            />
          </div>

          <select
            value={visibility}
            onChange={(event) =>
              onVisibilityChange(
                event.target.value as DashboardHeaderProps["visibility"]
              )
            }
            aria-label="Filter by visibility"
            className="h-9 rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="all">All visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value as FilterStatus)
            }
            aria-label="Filter by indexing status"
            className="h-9 rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="ALL">All status</option>
            <option value="PENDING">Not indexed</option>
            <option value="INDEXING">Indexing</option>
            <option value="READY">Ready</option>
            <option value="FAILED">Failed</option>
          </select>

          <Button variant="outline" onClick={onSync} disabled={isSyncing}>
            <RefreshCw
              className={isSyncing ? "animate-spin" : undefined}
              data-icon="inline-start"
            />
            Sync
          </Button>
        </div>
      </div>
    </header>
  );
}