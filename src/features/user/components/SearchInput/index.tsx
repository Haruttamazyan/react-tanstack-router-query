import { useNavigate, useSearch } from "@tanstack/react-router"
import { ChangeEvent,  useState } from "react"


const SearchInput = () => {
    const navigate = useNavigate()
    const {search } = useSearch({from: '/_auth/users'})
    const [searchInput, setSearchInput] = useState<string>(search)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)

        navigate({
            to:'/users',
            search: () => ({ search: e.target.value})
        })
    }

    return (<>
        <div className="relative ml-auto mr-10">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input value={searchInput} onInput={handleInputChange} type="text" id="table-search-users" className="block pt-2 ps-10  text-gray-900 border border-gray-300 rounded-lg w-50 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
        </div>
        </>
    )
}

export default SearchInput

