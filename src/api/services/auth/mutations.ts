import { useMutation, UseMutationResult } from "@tanstack/react-query"
import AuthService from './service'

export const useLogin = (): UseMutationResult => {
        return useMutation({
            mutationKey: ['login'],
            mutationFn: AuthService.Login
        })
    }
