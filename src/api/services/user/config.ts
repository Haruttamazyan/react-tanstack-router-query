export const Endpoints = {
    getAllUsers: () => '/get_users',
    getUserById: (id: string) => `/get_user_by_id?id=${id}}`,
    addUser: () => 'add_user',
    setStatus: (id: string) => `set_status?id=${id}`,
    updateUser: (id: number) => `update_user?id=${id}`,
    deleteUser: (id: string) => `delete_user?id=${id}`
}