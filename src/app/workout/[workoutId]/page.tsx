import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { FaCalendarPlus, FaRegBookmark } from 'react-icons/fa'

interface Workout {
  id: number | string
  name: string
  image: string
  muscleGroups?: string[]
  category?: string[]
  equipment: string
  difficulty: string
  duration: number
  caloriesBurned?: number
  calories?: number
  sets: number
  reps: string
  rating: number
  description: string
  instructions: string[]
}

async function getWorkout (id: string): Promise<Workout | null> {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      cache: 'no-store'
    })

    if (!res.ok) return null

    const data: Workout[] = await res.json()
    return data.find(item => String(item.id) === String(id)) || null
  } catch (error) {
    console.error('Failed to fetch workout details:', error)
    return null
  }
}

interface PageProps {
  params: Promise<{ workoutId: string }>
}

export default async function WorkoutDetailsPage ({ params }: PageProps) {
  const { workoutId } = await params
  const workout = await getWorkout(workoutId)

  if (!workout) {
    notFound()
  }

  const tags = workout.muscleGroups || workout.category || []
  const calories = workout.caloriesBurned ?? workout.calories ?? 0

  const specs = [
    { label: 'EQUIPMENT', value: workout.equipment },
    { label: 'DIFFICULTY', value: workout.difficulty },
    { label: 'SETS', value: workout.sets },
    { label: 'REPS', value: workout.reps },
    { label: 'DURATION', value: `${workout.duration} min` },
    { label: 'CALORIES', value: `${calories} kcal` },
    { label: 'RATING', value: workout.rating }
  ]

  return (
    <div className='min-h-screen bg-[#0c0e12] py-8 sm:py-12'>
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12'>
          <div className='lg:col-span-6'>
            <div className='relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161f] sm:rounded-3xl'>
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                unoptimized
                priority
                className='object-cover'
              />
            </div>
          </div>

          <div className='flex flex-col lg:col-span-6'>
            <h1 className='text-3xl font-black uppercase tracking-tight text-white sm:text-4xl'>
              {workout.name}
            </h1>

            <p className='mt-3 text-sm leading-relaxed text-neutral-400'>
              {workout.description}
            </p>

            <div className='mt-4 flex flex-wrap gap-2'>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className='rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black'
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className='mt-6 divide-y divide-neutral-800/80 rounded-2xl border border-neutral-800/80 bg-[#13161f]/80 p-1'>
              {specs.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between px-4 py-2.5 text-xs'
                >
                  <span className='font-semibold uppercase tracking-wider text-neutral-500'>
                    {item.label}
                  </span>
                  <span className='font-medium text-neutral-200'>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className='mt-6'>
              <h2 className='text-xs font-black uppercase tracking-widest text-white sm:text-sm'>
                INSTRUCTIONS
              </h2>
              <ol className='mt-3 space-y-2 text-xs leading-relaxed text-neutral-400 sm:text-sm'>
                {workout.instructions?.map((step, idx) => (
                  <li key={idx} className='flex gap-2'>
                    <span className='font-semibold text-neutral-500'>
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <button
                type='button'
                className='btn border-none bg-[#ccff00] px-5 text-xs font-bold text-black hover:bg-[#b5e600] rounded-xl transition flex items-center gap-2'
              >
                <FaCalendarPlus className='text-sm' />
                Add to today&apos;s plan
              </button>

              <button
                type='button'
                className='btn btn-outline border-neutral-800 bg-[#13161f] px-5 text-xs font-bold text-neutral-200 hover:border-neutral-700 hover:bg-neutral-800 rounded-xl transition flex items-center gap-2'
              >
                <FaRegBookmark className='text-sm' />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
