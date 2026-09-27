'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  FaChevronDown,
  FaRegClock,
  FaFire,
  FaStar,
  FaCheck,
  FaTimes
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useFitLog, Workout } from '../../context/FitLogContext'

type SortOption = 'Duration' | 'Calories' | 'Rating'

function MyPlanContent () {
  const router = useRouter()
  const { todayPlan, savedWorkouts, removeFromPlan, removeFromSaved } =
    useFitLog()
  const searchParams = useSearchParams()
  const tabQuery = searchParams.get('tab')

  const activeTab: 'plan' | 'saved' = tabQuery === 'saved' ? 'saved' : 'plan'

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sortBy, setSortBy] = useState<SortOption>('Duration')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 350)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab: 'plan' | 'saved') => {
    router.replace(`/my-plan?tab=${tab}`, { scroll: false })
  }

  const currentTabList = useMemo(() => {
    return activeTab === 'plan' ? todayPlan : savedWorkouts
  }, [activeTab, todayPlan, savedWorkouts])

  const totalExercises = currentTabList.length

  const totalMinutes = useMemo(() => {
    return currentTabList.reduce(
      (acc, item) => acc + (Number(item.duration) || 0),
      0
    )
  }, [currentTabList])

  const totalCalories = useMemo(() => {
    return currentTabList.reduce((acc, item) => {
      const cal = item.caloriesBurned ?? item.calories ?? 0
      return acc + Number(cal)
    }, 0)
  }, [currentTabList])

  const displayedList = useMemo(() => {
    const listCopy = [...currentTabList]

    return listCopy.sort((a, b) => {
      if (sortBy === 'Duration') {
        return (Number(a.duration) || 0) - (Number(b.duration) || 0)
      }
      if (sortBy === 'Calories') {
        const calA = Number(a.caloriesBurned ?? a.calories ?? 0)
        const calB = Number(b.caloriesBurned ?? b.calories ?? 0)
        return calA - calB
      }
      if (sortBy === 'Rating') {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0)
      }
      return 0
    })
  }, [currentTabList, sortBy])

  const handleMarkAsDone = (workout: Workout) => {
    removeFromPlan(workout.id)
    toast.success(`Completed "${workout.name}"! Great work!`)
  }

  const handleRemove = (workout: Workout) => {
    if (activeTab === 'plan') {
      removeFromPlan(workout.id)
    } else {
      removeFromSaved(workout.id)
    }
  }

  const sortOptions: SortOption[] = ['Duration', 'Calories', 'Rating']

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
                {totalExercises}
              </span>
            </div>

            <div className='pt-4 flex flex-col md:pt-0 md:px-8'>
              <span className='text-xs font-semibold uppercase tracking-wider text-neutral-400'>
                Minutes
              </span>
              <span className='mt-2 text-4xl sm:text-5xl font-black text-white'>
                {totalMinutes}
              </span>
            </div>

            <div className='pt-4 flex flex-col md:pt-0 md:px-8'>
              <span className='text-xs font-semibold uppercase tracking-wider text-neutral-400'>
                Calories
              </span>
              <span className='mt-2 text-4xl sm:text-5xl font-black text-white'>
                {totalCalories}
              </span>
            </div>
          </div>
        </div>

        <div className='mb-6 flex flex-wrap items-end justify-between gap-4'>
          <div className='inline-flex rounded-xl border border-neutral-800 bg-[#13161f] p-1'>
            <button
              type='button'
              onClick={() => handleTabChange('plan')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'plan'
                  ? 'bg-[#1c202a] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              type='button'
              onClick={() => handleTabChange('saved')}
              className={`rounded-lg px-5 py-2 text-xs font-bold transition cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-[#1c202a] text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <div className='flex flex-col items-end'>
            <span className='text-xs text-neutral-400 mb-1.5 self-start'>
              Sort By
            </span>

            <div className='dropdown dropdown-end'>
              <div
                tabIndex={0}
                role='button'
                className='flex items-center justify-between w-44 rounded-full border border-neutral-400/60 bg-[#13161f] px-4 py-2 text-xs font-semibold text-white hover:border-neutral-200 transition cursor-pointer'
              >
                <span>{sortBy}</span>
                <FaChevronDown className='text-[10px] text-neutral-400' />
              </div>

              <ul
                tabIndex={0}
                className='dropdown-content menu z-20 mt-1.5 w-44 rounded-2xl border border-neutral-800 bg-[#181b24] p-1.5 text-xs shadow-2xl space-y-0.5'
              >
                {sortOptions.map(option => {
                  const isSelected = sortBy === option
                  return (
                    <li key={option}>
                      <button
                        type='button'
                        onClick={() => {
                          setSortBy(option)
                          if (document.activeElement instanceof HTMLElement) {
                            document.activeElement.blur()
                          }
                        }}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition cursor-pointer ${
                          isSelected
                            ? 'bg-[#222733] font-bold text-white'
                            : 'text-neutral-300 hover:bg-neutral-800/70 hover:text-white'
                        }`}
                      >
                        <span className='flex items-center gap-2'>
                          {isSelected && (
                            <FaCheck className='text-[10px] text-white' />
                          )}
                          <span className={!isSelected ? 'pl-4' : ''}>
                            {option}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-800/60 bg-[#13161f]/40 p-8'>
            <div className='h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-[#ccff00]' />
            <p className='text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400 animate-pulse'>
              Loading workouts…
            </p>
          </div>
        ) : displayedList.length === 0 ? (
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
        ) : (
          <div className='space-y-4'>
            {displayedList.map(workout => {
              const calories = workout.caloriesBurned ?? workout.calories ?? 0

              return (
                <div
                  key={workout.id}
                  className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-neutral-800/80 bg-[#13161f] p-4 transition hover:border-neutral-700'
                >
                  <div className='flex w-full sm:w-auto items-center gap-4'>
                    <div className='relative h-16 w-24 sm:h-20 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800'>
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        unoptimized
                        className='object-cover'
                      />
                    </div>
                    <div>
                      <Link
                        href={`/workout/${workout.id}`}
                        className='text-sm sm:text-base font-black uppercase tracking-tight text-white hover:text-[#ccff00] transition'
                      >
                        {workout.name}
                      </Link>
                      <p className='text-xs text-neutral-400 mt-0.5'>
                        {workout.equipment}
                      </p>

                      <div className='mt-2 flex items-center gap-3 text-xs text-neutral-300'>
                        <span className='flex items-center gap-1'>
                          <FaRegClock className='text-neutral-500 text-xs' />
                          {workout.duration} min
                        </span>
                        <span className='flex items-center gap-1'>
                          <FaFire className='text-amber-500 text-xs' />
                          {calories} kcal
                        </span>
                        <span className='flex items-center gap-1'>
                          <FaStar className='text-yellow-400 text-xs' />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex w-full sm:w-auto items-center justify-end gap-2.5'>
                    <Link
                      href={`/workout/${workout.id}`}
                      className='rounded-full border border-neutral-700 bg-neutral-900/60 px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-neutral-500 hover:text-white transition'
                    >
                      View Details
                    </Link>

                    {activeTab === 'plan' && (
                      <button
                        type='button'
                        onClick={() => handleMarkAsDone(workout)}
                        className='flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black hover:bg-[#b5e600] transition cursor-pointer'
                      >
                        <FaCheck className='text-xs' />
                        Mark as Done
                      </button>
                    )}

                    <button
                      type='button'
                      onClick={() => handleRemove(workout)}
                      className='p-2 text-neutral-400 hover:text-red-400 transition cursor-pointer'
                      title='Remove workout'
                      aria-label='Remove workout'
                    >
                      <FaTimes className='text-sm' />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default function MyPlanPage () {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-[#0c0e12] flex items-center justify-center text-white'>
          <p className='text-xs font-semibold uppercase tracking-wider text-neutral-400 animate-pulse'>
            Loading workouts…
          </p>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  )
}
