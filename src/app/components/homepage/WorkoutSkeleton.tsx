import React from 'react';

export default function WorkoutSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="h-7 w-48 animate-pulse rounded-lg bg-neutral-800" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded-lg bg-neutral-800/60" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded-xl bg-neutral-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161f] p-4"
          >
            <div className="relative aspect-video w-full animate-pulse rounded-xl bg-neutral-800/80" />
            <div className="mt-4 flex items-center justify-between">
              <div className="h-5 w-3/5 animate-pulse rounded bg-neutral-800" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-800/80" />
            </div>
            <div className="mt-2.5 space-y-1.5">
              <div className="h-3 w-full animate-pulse rounded bg-neutral-800/50" />
              <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-800/50" />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-neutral-800/60 pt-3">
              <div className="h-3 w-14 animate-pulse rounded bg-neutral-800" />
              <div className="h-3 w-16 animate-pulse rounded bg-neutral-800" />
              <div className="h-3 w-10 animate-pulse rounded bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}