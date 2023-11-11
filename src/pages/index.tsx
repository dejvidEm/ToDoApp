import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='w-screen h-screen pt-20 text-center bg-bg-main flex flex-col items-center justify-between'>
      <div><div className='font-bold text-color-primary text-2xl p-10'>Najlepšia ToDo appka na trhu</div>
      <Link href="/todoapp" className='underline'><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      Otvoriť Zoznam
      </span>
      </button></Link>
      </div>
      <p className='text-sm'>Vytvoril: Dávid Mikuláš</p>
    </main>
  )
}
