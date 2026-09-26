'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logoImg from '../../assets/logo.png';
import { useFitLog } from '../../context/FitLogContext';

export default function Navbar() {
  const { todayPlan, savedWorkouts } = useFitLog();
  const pathname = usePathname();

  const isWorkoutActive = pathname === '/';
  const isPlanActive = pathname.startsWith('/my-plan');

  return (
    <header className="sticky top-0 z-50 w-full border-t-0 border-b border-neutral-800 bg-[#0c0e12]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition hover:opacity-90"
        >
          <Image
            src={logoImg}
            alt="FITLOG Logo"
            width={30}
            height={30}
            className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            priority
          />
          <span className="text-lg sm:text-xl font-black tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
              isWorkoutActive
                ? 'bg-[#19270e] text-[#ccff00]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
              isPlanActive
                ? 'bg-[#19270e] text-[#ccff00]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:text-white"
          >
            <span>Plan</span>
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#ccff00] text-[11px] sm:text-xs font-black text-black">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border border-neutral-700 bg-transparent text-[11px] sm:text-xs font-semibold text-neutral-300">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}