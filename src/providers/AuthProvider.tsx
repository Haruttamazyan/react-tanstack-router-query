import { createContext, PropsWithChildren, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { client } from "../api/Request";

export type authContextType = {isAuthenticated: boolean, login: (token: string) => Promise<void>, logout: () => void} | null

const AuthContext = createContext<authContextType | null>(null)


export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}


export const AuthProvider = ({children}: PropsWithChildren) => {

    const [token, setToken, removeToken] = useLocalStorage('token', '');

    const login = async (token: string) => {
        setToken(token);
      client.defaults.headers['Authorization'] = `Bearer ${token}`;
    };
  
    const logout = async () => {
      removeToken()
      delete client.defaults.headers['Authorization'];
    };

  
    return (
      <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
}

