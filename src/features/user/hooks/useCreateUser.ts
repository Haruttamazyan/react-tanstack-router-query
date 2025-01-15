import { useCallback } from "react"
import { useModalContext } from "../../../providers/ModalProvider"
import { useUserCreation } from "../../../api/services/user/mutation"
import { UserFormFields } from "../../../components/Modals/components/UserModal"
import { toast } from "react-toastify"

export const useCreateUser = () => {
    const { mutate: createUser } = useUserCreation()
    const { open } = useModalContext()

    
    const openUserModal = useCallback(() => {
        open({
            name:'UserModal',
            id: 'user-create-modal',
            props: {
                submit: createUserHandler
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[open])


    const createUserHandler = (data: UserFormFields): Promise<unknown> => {
        return new Promise<void>((rsl, rej) => {
            // TODO add right types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createUser((data as any), {
                onSuccess: () => {
                    toast.success('User Created successfuly')
                    rsl()
                } ,
                onError: rej
            })
        })
    }
    return openUserModal
}