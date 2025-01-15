import  type { ConfirmationModalProps } from "../components/Modals/components/ConfirmationModal"
import type { UserCreateOrEditProps } from "../components/Modals/components/UserModal"

type UserModal = {
    name: 'UserModal',
    id: string,
    props: UserCreateOrEditProps
}

type ConfirmationModal = {
    name: 'ConfirmationModal',
    id: string,
    props: ConfirmationModalProps
}

export type Modals = UserModal | ConfirmationModal