import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { CartWidget } from './cart-widget'

export default function Header() {
  async function handleSearch(data: FormData) {
    'use server'
    const query = data.get('q')

    if (!query) return

    redirect(`/search?q=${query}`)
  }
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          devstore
        </Link>
        <form
          action={handleSearch}
          method="GET"
          className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
        >
          <Search className="h-5 w-5 text-zinc-500" />
          <input
            placeholder="Buscar produtos..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
            name="q"
            required
          />
        </form>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />
        <div className="h-4 w-px bg-zinc-700"></div>
        <Link href="/" className="flex items-center gap-2 hover:underline">
          <span className="text-sm">Account</span>
          <Image
            src="https://github.com/PabloSant0s.png"
            className="h-6 w-6 rounded-full"
            width={24}
            height={24}
            alt=""
          />
        </Link>
      </div>
    </div>
  )
}
