import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { User } from "../types";


export const useSearchInput = <T extends User>(users: T[]): T[] => {
    const { search } = useSearch({from: '/_auth/users'})
    
    const filteredUsers: T[] = useMemo(() => {
        return users.filter(e => e.name.match(search) || e.email?.match(search) || e.phone.match(search))

    },[users, search])

    return filteredUsers
}