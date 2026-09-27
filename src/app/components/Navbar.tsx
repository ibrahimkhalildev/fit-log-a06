'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoImg from '../../assets/logo.png';
import { useFitLog } from '../../context/FitLogContext';

export default function Navbar() {
  const { todayPlan, savedWorkouts } = useFitLog();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isWorkoutActive = pathname === '/';
  const isPlanActive = pathname.startsWith('/my-plan');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#0c0e12]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 transition hover:opacity-90"
        >
          <Image
            src={logoImg}
            alt="FITLOG Logo"
            width={30}
            height={30}
            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
            priority
          />
          <span className="text-base font-black tracking-wider text-white sm:text-xl">
            FITLOG
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex md:gap-4 lg:gap-6">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
              isWorkoutActive
                ? 'bg-[#19270e] text-[#ccff00]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
              isPlanActive
                ? 'bg-[#19270e] text-[#ccff00]'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-5">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition hover:text-white sm:gap-2 sm:text-sm"
          >
            <span className="whitespace-nowrap">Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ccff00] text-[10px] font-black text-black sm:h-6 sm:w-6 sm:text-xs">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition hover:text-white sm:gap-2 sm:text-sm"
          >
            <span className="whitespace-nowrap">Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-700 bg-transparent text-[10px] font-semibold text-neutral-300 sm:h-6 sm:w-6 sm:text-xs">
              {savedWorkouts.length}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-[#13161f] text-neutral-300 transition hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="text-sm" /> : <FaBars className="text-sm" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-800/80 bg-[#0c0e12] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                isWorkoutActive
                  ? 'bg-[#19270e] text-[#ccff00]'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              }`}
            >
              Workouts
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setIsOpen(false)}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                isPlanActive
                  ? 'bg-[#19270e] text-[#ccff00]'
                  : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
              }`}
            >
              My Plan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}