import React from 'react';
import Link from 'next/link';
import { FaDumbbell } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#0c0e12] px-4 text-center text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-neutral-800 bg-[#13161f] shadow-2xl">
        <FaDumbbell className="text-3xl text-[#ccff00]" />
      </div>

      <h1 className="mt-6 text-6xl sm:text-7xl font-black tracking-tight text-white">
        404
      </h1>
      <h2 className="mt-2 text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-xs sm:text-sm text-neutral-400">
        The workout or page you are looking for doesn&apos;t exist, was removed, or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-xl bg-[#ccff00] px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#b5e600]"
      >
        Back to Workouts
      </Link>
    </div>
  );
}