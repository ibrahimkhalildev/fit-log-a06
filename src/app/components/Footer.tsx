import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../assets/logo.png'

export default function Footer () {
  return (
    <footer className='mt-auto border-t border-neutral-800/80 bg-[#0c0e12] py-8'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='flex items-center gap-2.5 transition hover:opacity-90'
        >
          <Image
            src={logoImg}
            alt='FITLOG Logo'
            width={24}
            height={24}
            className='h-6 w-6 object-contain'
          />
          <span className='text-sm font-bold tracking-wider text-white'>
            FITLOG
          </span>
        </Link>

        <p className='text-center text-xs text-neutral-500 sm:text-right'>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  )
}
