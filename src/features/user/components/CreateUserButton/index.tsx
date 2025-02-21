import { useCreateUser } from "../../hooks/useCreateUser"

const CreateUserButton = () => {
    const openUserModal = useCreateUser()

    return (
        <div className="relative ml-3">
            <button  onClick={() => openUserModal()} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg  px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Create</button>
        </div>
    )
}

export default CreateUserButton