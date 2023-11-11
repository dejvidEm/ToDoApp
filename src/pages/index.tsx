import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='w-[500px] h-[300px] mx-auto pt-20 text-center'>
      <div className='font-bold text-color-primary'>Tvoja nová TODO Aplíkácia</div>
      <Link href="/todoapp" className='underline'>Klikaj sem aby si sa dostal do appky</Link>
    </main>
  )
}
