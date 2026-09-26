'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaRegClock, FaFire, FaStar } from 'react-icons/fa'

interface Workout {
  id: string | number
  name: string
  muscleGroups: string[] | string
  equipment: string
  duration: number
  calories?: number
  caloriesBurned?: number
  rating: number
  image: string
}

const WorkOutLibrary = () => {
  const [workoutData, setWorkoutData] = useState<Workout[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
          cache: 'no-store'
        })

        if (!res.ok) {
          throw new Error('Failed to fetch workouts')
        }

        const data = await res.json()
        setWorkoutData(data)
      } catch (error) {
        console.error('Error fetching workout data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <section
      id='library'
      className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-black uppercase tracking-tight text-white sm:text-3xl'>
          THE LIBRARY
        </h2>
        <p className='mt-1 text-xs text-neutral-400 sm:text-sm'>
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161f] p-0 animate-pulse'
            >
              <div className='aspect-[16/10] w-full bg-neutral-800/80' />
              <div className='flex flex-1 flex-col p-5'>
                <div className='flex gap-1.5'>
                  <div className='h-4 w-14 rounded-full bg-neutral-800' />
                  <div className='h-4 w-12 rounded-full bg-neutral-800' />
                </div>
                <div className='mt-3 h-5 w-3/4 rounded bg-neutral-800' />
                <div className='mt-2 h-3 w-1/3 rounded bg-neutral-800/60' />
                <div className='mt-6 flex items-center justify-between border-t border-neutral-800/80 pt-4'>
                  <div className='h-3 w-14 rounded bg-neutral-800' />
                  <div className='h-3 w-14 rounded bg-neutral-800' />
                  <div className='h-3 w-10 rounded bg-neutral-800' />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {workoutData.map((workout, ind) => {
            const categories = Array.isArray(workout.muscleGroups)
              ? workout.muscleGroups
              : [workout.muscleGroups]

            const caloriesCount =
              workout.calories ?? workout.caloriesBurned ?? 0

            return (
              <Link
                key={workout.id || ind}
                href={`/workout/${workout.id}`}
                className='group flex flex-col overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161f] transition duration-200 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-xl'
              >
                <div className='relative aspect-[16/10] w-full overflow-hidden bg-neutral-900'>
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover transition duration-300 group-hover:scale-105'
                  />
                </div>

                <div className='flex flex-1 flex-col p-5'>
                  <div className='flex flex-wrap gap-1.5'>
                    {categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className='rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-black'
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <h3 className='mt-3 text-base font-bold uppercase tracking-tight text-white transition group-hover:text-[#ccff00]'>
                    {workout.name}
                  </h3>

                  <p className='mt-1 text-xs text-neutral-400'>
                    {workout.equipment}
                  </p>

                  <div className='mt-auto flex items-center gap-4 border-t border-neutral-800/80 pt-4 text-xs text-neutral-400'>
                    <span className='flex items-center gap-1.5'>
                      <FaRegClock className='text-neutral-400 text-xs' />
                      {workout.duration} min
                    </span>

                    <span className='flex items-center gap-1.5'>
                      <FaFire className='text-amber-500 text-xs' />
                      {caloriesCount} kcal
                    </span>

                    <span className='flex items-center gap-1.5'>
                      <FaStar className='text-yellow-400 text-xs' />
                      {workout.rating}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default WorkOutLibrary