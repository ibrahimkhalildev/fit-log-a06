import React from 'react'
import Image from 'next/image'
import bannerImg from '../../../assets/banner.png'

const Banner = () => {
  return (
    <section className='mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8'>
      <div className='relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#13161d] p-6 sm:p-8 md:p-10 lg:p-12 md:rounded-3xl'>
        <div className='grid grid-cols-1 items-center gap-8 lg:grid-cols-12'>
          <div className='text-center sm:text-left lg:col-span-7'>
            <p className='text-xs font-bold uppercase tracking-widest text-[#ccff00]'>
              WORKOUT LIBRARY
            </p>

            <h1 className='mt-3 text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl'>
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>

            <p className='mx-auto mt-4 max-w-lg text-xs leading-relaxed text-neutral-400 sm:mx-0 sm:text-sm md:text-base'>
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <div className='mt-6 sm:mt-8'>
              <a
                href='#library'
                className='btn border-none bg-[#ccff00] px-6 text-xs font-bold uppercase tracking-wider text-black hover:bg-[#b5e600] rounded-lg transition'
              >
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          <div className='flex items-center justify-center lg:col-span-5 lg:justify-end'>
            <div className='relative flex items-center justify-center'>
              <Image
                src={bannerImg}
                alt='Workout Banner Fitlog'
                width={224}
                height={334}
                priority
                className='h-auto max-h-[334px] w-[180px] sm:w-[224px] object-contain drop-shadow-2xl transition-all duration-300'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
