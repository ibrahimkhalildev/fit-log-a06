'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export interface Workout {
  id: number | string
  name: string
  image: string
  equipment: string
  duration: number
  caloriesBurned?: number
  calories?: number
  rating: number
  difficulty?: string
  sets?: number
  reps?: string
  description?: string
  instructions?: string[]
  category?: string[]
  muscleGroups?: string[]
}

interface FitLogContextType {
  todayPlan: Workout[]
  savedWorkouts: Workout[]
  addToPlan: (workout: Workout) => void
  saveForLater: (workout: Workout) => void
  removeFromPlan: (id: number | string) => void
  removeFromSaved: (id: number | string) => void
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined)

export function FitLogProvider ({ children }: { children: React.ReactNode }) {
  const [todayPlan, setTodayPlan] = useState<Workout[]>([])
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const storedPlan = localStorage.getItem('fitlog_today_plan')
        const storedSaved = localStorage.getItem('fitlog_saved')
        if (storedPlan) setTodayPlan(JSON.parse(storedPlan))
        if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved))
      } catch (error) {
        console.error('Failed to load storage data:', error)
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const addToPlan = (workout: Workout) => {
    if (todayPlan.length >= 5) {
      toast.warn("Today's plan is full! (Maximum 5 workouts)")
      return
    }

    const isExist = todayPlan.some(
      item => String(item.id) === String(workout.id)
    )
    if (isExist) {
      toast.info(`"${workout.name}" is already in today's plan!`)
      return
    }

    const updated = [...todayPlan, workout]
    setTodayPlan(updated)
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updated))
    toast.success(`Added "${workout.name}" to today's plan!`)
  }

  const saveForLater = (workout: Workout) => {
    const isExist = savedWorkouts.some(
      item => String(item.id) === String(workout.id)
    )
    if (isExist) {
      toast.info(`"${workout.name}" is already saved for later!`)
      return
    }

    const updated = [...savedWorkouts, workout]
    setSavedWorkouts(updated)
    localStorage.setItem('fitlog_saved', JSON.stringify(updated))
    toast.success(`Saved "${workout.name}" for later!`)
  }

  const removeFromPlan = (id: number | string) => {
    const updated = todayPlan.filter(item => String(item.id) !== String(id))
    setTodayPlan(updated)
    localStorage.setItem('fitlog_today_plan', JSON.stringify(updated))
    toast.info("Removed from today's plan")
  }

  const removeFromSaved = (id: number | string) => {
    const updated = savedWorkouts.filter(item => String(item.id) !== String(id))
    setSavedWorkouts(updated)
    localStorage.setItem('fitlog_saved', JSON.stringify(updated))
    toast.info('Removed from saved')
  }

  return (
    <FitLogContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved
      }}
    >
      {children}
    </FitLogContext.Provider>
  )
}

export function useFitLog () {
  const context = useContext(FitLogContext)
  if (!context) {
    throw new Error('useFitLog must be used within a FitLogProvider')
  }
  return context
}
