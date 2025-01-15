import { User } from "../../types"
import { useUserStatusChange } from "../../hooks/useUserStatusChnage"

type UserStatusProps = {
    user: User
}

const UserStatus = ({user}: UserStatusProps) => {
    const openModal = useUserStatusChange(user)

    return (
        <div className="flex items-center">
            <div className={`h-2.5 w-2.5 rounded-full ${user.status == 'active'? 'bg-green-500': 'bg-red-500'}  me-2 pointer-events-`}></div>
                <a onClick={openModal} className="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">{user.status}</a>
        </div>
    )
}

export default UserStatus