import { useCallback } from "react"
import { User } from "../types"
import { useUserDelete } from "../../../api/services/user/mutation"
import { useModalContext } from "../../../providers/ModalProvider"
import queryClient from "../../../api/QueryClient"
import { toast } from "react-toastify"

export const useDeleteUser = () => {
    const { open, remove } = useModalContext()
    const { mutate: deleteUserById } = useUserDelete()
    
    const openDeleteConfirmationModal = useCallback((row: User) => {
        open({
            name:'ConfirmationModal',
            id: 'user-delete-modal',
            props: {
                msg: `Delete User ${row.name}`,
                handler: () => deleteUser(String(row.id))
            }
        })
    },[open])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const deleteUser= (id: string) => {
        deleteUserById(id,{
            async onSuccess() {
                toast.success('User Deleted successfuly')
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                remove() 
            }
        })
    }

    return openDeleteConfirmationModal
}