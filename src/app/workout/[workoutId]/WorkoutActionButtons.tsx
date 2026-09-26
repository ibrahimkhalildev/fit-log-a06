'use client';

import React from 'react';
import { FaCalendarPlus, FaRegBookmark } from 'react-icons/fa';
import { useFitLog, Workout } from '../../../context/FitLogContext';

export default function WorkoutActionButtons({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = useFitLog();

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className="btn border-none bg-[#ccff00] px-5 text-xs font-bold text-black hover:bg-[#b5e600] rounded-xl flex items-center gap-2 cursor-pointer"
      >
        <FaCalendarPlus className="text-sm" />
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        className="btn border border-neutral-800 bg-[#13161f] px-5 text-xs font-bold text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 rounded-xl flex items-center gap-2 cursor-pointer"
      >
        <FaRegBookmark className="text-sm" />
        Save for later
      </button>
    </div>
  );
}