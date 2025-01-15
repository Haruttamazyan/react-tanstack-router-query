import service from "./service";

class UserQueryMethods {
    public async getUser() {
        const res = await service.getAllUsers()
        return res.users 
    }
    public async getUserById(id: string) {
        const res = await service.getUserById(id)
        return res.user
    }
}


export default new UserQueryMethods()