"use client"

import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2, Search } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
// import {useClient} from 'next/client'
const SearchBar = () => {
    // const { useClient, useRef } = useClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isSearching, startTransition] = useTransition()
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const search = () => {
        startTransition(() => {
            router.push(`/search?query=${query}`)
        })
    }
    return (
        <div className="relative h-14 w-full flex flex-col bg-white">
            <div className="relative h-full w-full z-10 rounded-md">
                <Input disabled={isSearching} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {

                    if (e.key === 'Enter') {
                        search()
                    }
                    if (e.key === "Escape") {

                        inputRef?.current?.blur()
                    }


                }} ref={inputRef} className="absolute  inset-0 h-full" />
                <Button size='sm' onClick={search} className="absolute right-0 inset-y-0 h-full rounded-l-none" >


                    {isSearching ? <Loader2 className="h-6 w-6 animate-spin"></Loader2> : <Search className="relative text-blue-200  h-6 w-6 " />}
                </Button>
            </div>
        </div>
    )
}

export default SearchBar
