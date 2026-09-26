import React from 'react'
import Link from 'next/link'
import { FaChevronDown } from 'react-icons/fa'

export default function MyPlanPage () {
  return (
    <div className='min-h-screen bg-[#0c0e12] py-8 sm:py-12 text-white'>
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-black uppercase tracking-tight sm:text-4xl text-white'>
            MY PLAN
          </h1>
          <p className='mt-2 text-xs sm:text-sm text-neutral-400'>
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className='mb-8 overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161f] p-6 sm:p-8'>
          <div className='grid grid-cols-1 gap-6 divide-y divide-neutral-800 md:grid-cols-3 md:gap-0 md:divide-y-0 md:divide-x'>
            <div className='flex flex-col md:px-6 first:pl-0'>
              <span className='text-xs font-semibold uppercase tracking-wider text-neutral-400'>
                Exercises
              </span>
              <span className='mt-2 text-4xl sm:text-5xl font-black text-[#ccff00]'>
                5
              </span>
            </div>

            <div className='pt-4 flex flex-col md:pt-0 md:px-8'>
              <span className='text-xs font-semibold uppercase tracking-wider text-neutral-400'>
                Minutes
              </span>
              <span className='mt-2 text-4xl sm:text-5xl font-black text-white'>
                50
              </span>
            </div>

            <div className='pt-4 flex flex-col md:pt-0 md:px-8'>
              <span className='text-xs font-semibold uppercase tracking-wider text-neutral-400'>
                Calories
              </span>
              <span className='mt-2 text-4xl sm:text-5xl font-black text-white'>
                650
              </span>
            </div>
          </div>
        </div>

        <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
          <div className='inline-flex rounded-xl border border-neutral-800 bg-[#13161f] p-1'>
            <button
              type='button'
              className='rounded-lg px-5 py-2 text-xs font-bold text-neutral-400 hover:text-white transition'
            >
              Today&apos;s Plan
            </button>
            <button
              type='button'
              className='rounded-lg bg-[#1c202a] px-5 py-2 text-xs font-bold text-white shadow-sm transition'
            >
              Saved
            </button>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-xs text-neutral-400'>Sort By</span>
            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-sm border-neutral-800 bg-[#13161f] text-xs font-semibold text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 gap-2 rounded-lg capitalize'
              >
                Duration
                <FaChevronDown className='text-[10px] text-neutral-400' />
              </div>
            </div>
          </div>
        </div>

        <div className='flex min-h-[380px] w-full flex-col items-center justify-center rounded-2xl border border-neutral-800/80 bg-[#101216] p-8 text-center sm:min-h-[440px]'>
          <h3 className='text-xl sm:text-2xl font-black uppercase tracking-wider text-white'>
            NOTHING HERE YET
          </h3>
          <p className='mt-2 text-xs sm:text-sm text-neutral-400'>
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href='/'
            className='mt-6 btn border-none bg-[#ccff00] px-6 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#b5e600] rounded-xl transition'
          >
            Go to workouts
          </Link>
        </div>
      </main>
    </div>
  )
}
