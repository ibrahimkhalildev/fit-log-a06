import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../assets/logo.png'

export default function Navbar () {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#0c0e12]/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center gap-2.5 transition hover:opacity-90'
        >
          <Image
            src={logoImg}
            alt='FITLOG Logo'
            width={32}
            height={32}
            className='h-8 w-8 object-contain'
            priority
          />
          <span className='text-xl font-black tracking-wider text-white'>
            FITLOG
          </span>
        </Link>

        <nav className='flex items-center rounded-full border border-neutral-800 bg-neutral-900/90 p-1'>
          <Link
            href='/'
            className='rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:text-[#ccff00]'
          >
            Workout
          </Link>
          <Link
            href='/my-plan'
            className='rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-neutral-300 transition hover:text-[#ccff00]'
          >
            My Plan
          </Link>
        </nav>

        <div className='flex items-center gap-3'>
          <Link
            href='/my-plan'
            className='flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition hover:opacity-90'
          >
            <span>Plan</span>
            <span className='badge badge-sm border-none bg-[#ccff00] font-bold text-black px-2 py-0.5'>
              0
            </span>
          </Link>

          <Link
            href='/my-plan'
            className='flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition hover:opacity-90'
          >
            <span>Saved</span>
            <span className='badge badge-sm border border-neutral-700 bg-transparent text-neutral-300 px-2 py-0.5'>
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
