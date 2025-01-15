import { useCallback } from "react"
import { useModalContext } from "../../../providers/ModalProvider"
import { User } from "../types"
import { useUserEdit } from "../../../api/services/user/mutation"
import { UserFormFields } from "../../../components/Modals/components/UserModal"
import { toast } from "react-toastify"

export const useEditUser = () => {
    const { mutate: editUser } = useUserEdit()
    const { open, remove } = useModalContext()

    
    const openUserModal = useCallback((row: User) => {
        open({
            name:'UserModal',
            id: 'user-create-modal',
            props: {
                user: row,
                submit: updateUser
            }
        })
    },[open])


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateUser = (data: UserFormFields & { status: string, id: any}): Promise<void> => {
        return new Promise<void>((rsl, rej) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            editUser((data as any), {
                onSuccess: () => {
                    toast.success('User Edited successfuly')
                    rsl()
                },
                onError: (err) => {
                    remove()
                    rej(err)
                }
            })
        })
    }
    return openUserModal
}