import request from "../../Request";
import { Endpoints } from "./config";

class AuthService {
    public async Login (data: unknown): Promise<unknown> {
        return await request({
            url:Endpoints.login(),
            method: 'get',
            params:data
        })
    }
}

export default new AuthService()