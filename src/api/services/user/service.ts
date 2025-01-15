import { User } from "../../../features/user/types/user";
import request from "../../Request";
import { Endpoints } from './config'

class UserService {
    public async getAllUsers() {
        return await request({
            url: Endpoints.getAllUsers()
        })
    }
    public async getUserById(id: string) {
        return await request({
            url: Endpoints.getUserById(id)
        })
    }

    public async createUser(data: User) {
        const reqData = JSON.stringify({...data, "status": "active"})

        return await request({
            method: 'post',
            url: Endpoints.addUser(),
            data: reqData
        })
    }
    public async deleteUser(id: string) {
        return await request({
            method: 'delete',
            url: Endpoints.deleteUser(id),
        })
    }
    public async editUser(data: User){
        return await request({
            method: 'post',
            url: Endpoints.updateUser(data.id),
            data: JSON.stringify(data)
        })
    }
    public async changeUserStatus({id, status}: {id: string, status: string}) {
        return await request({
            method: 'post',
            url: Endpoints.setStatus(id),
            data: JSON.stringify({status})
        })
    }
}


export default new UserService()