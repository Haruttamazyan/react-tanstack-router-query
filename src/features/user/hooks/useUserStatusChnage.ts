import { User } from "../types"
import { useChangeStatus } from "../../../api/services/user/mutation"
import { useModalContext } from "../../../providers/ModalProvider"
import queryClient from "../../../api/QueryClient"
import { toast } from "react-toastify"

const UserStatusVatiants = {
    online: 'active',
    offline: 'inactive'
}

export const useUserStatusChange = (user: User) => {
    const { open, remove } = useModalContext()
    const { mutate: changeStatus } = useChangeStatus()

    const openModal = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        open({
            name:'ConfirmationModal',
            id: 'user-status-modal',
            props: {
                msg: `${user.status == UserStatusVatiants.online? 'Deactivate': 'Activate'} User ${user.name}`,
                handler: changeUserStatus
            }
        })
    }

    const changeUserStatus = async () => {
        const nextStatus = user.status == UserStatusVatiants.online? UserStatusVatiants.offline: UserStatusVatiants.online;
        changeStatus({id: String(user.id), status: nextStatus},{
            async onSuccess() {
                toast.success('User updated successfuly',{
                    position: 'bottom-right'
                })
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                remove()
            }
        })
    }
    return openModal
}