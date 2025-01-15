import { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";
//import { User } from "../features/user/types/user";

import type { Modals } from '../types'

// export type ModalContextType = {
//     show: boolean,
//     mode: string | null,
//     selectedUser: User| null,
//     openModal: (mode: string, user: User| null) => void,
//     closeModal: () => void
// }

// const ModalContext  = createContext<ModalContextType| null>(null)



// const ModalProvider = ({children}: PropsWithChildren) => {
//     const [show, setShow ] = useState(false)
//     const [mode, setMode ] = useState<string| null>(null)
//     const [selectedUser, setSelectedUser] = useState<User| null>(null)

//     const openModal = useCallback((mode: string, user: User | null) : void => {
//         setShow(true)
//         setMode(mode)
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         !!user && setSelectedUser(user)
//     },[])

//     const closeModal = useCallback(() => {
//         setShow(false)
//         setMode(null)
//         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//         !!selectedUser && setSelectedUser(null)
//     },[selectedUser])

//     return <ModalContext.Provider value={{show, mode,selectedUser,openModal,closeModal}}>
//         {children}
//     </ModalContext.Provider>
// }

type Context = {
    modals: Modals[]
    open: (modal: Modals) => void
    remove: () => void
    closeAll: () => void
  }
  
  const ModalContext = createContext({} as Context)

    // eslint-disable-next-line react-refresh/only-export-components
    export const useModalContext = () => {
        const context  = useContext(ModalContext)

        if(!context){
            throw new Error(" contexttt chkaa")
        }
        return context
    }
    
  export const ModalProvider = ({ children }: PropsWithChildren) => {
    const [modals, setModals] = useState<Modals[]>([])
  
    const open = useCallback((modal: Modals) => setModals([modal]),[])
  
    const remove = useCallback(() => setModals((old) => old.slice(0, old.length - 1)),[])
  
    const closeAll = useCallback(() => setModals([]),[])
  
    return (
      <ModalContext.Provider value={{ closeAll, modals, open, remove }}>
        {children}
      </ModalContext.Provider>
    )
  }

export default ModalProvider