import { useMutation } from "@tanstack/react-query"
import service from './service'

export const useUserCreation = () => {
    return useMutation({
        mutationKey:['creatUser'],
        mutationFn: service.createUser
    })
}

export const useUserEdit = () => {
    return useMutation({
        mutationKey:['editUser'],
        mutationFn: service.editUser
    })
}

export const useChangeStatus = () => {
    return useMutation({
        mutationFn: service.changeUserStatus,
        mutationKey: ['changeStatus']
    })
}

export const useUserDelete = () => {
    return useMutation({
        mutationFn: service.deleteUser,
        mutationKey: ['deleteUser']
    })
}