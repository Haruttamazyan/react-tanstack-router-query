import { useEffect } from "react"

const useKeyDown = (key: KeyboardEvent['key'], fn: () => void, deps: unknown[] = []) => {
    useEffect(()=>{
        const handleKeydown = (event: KeyboardEvent) => {
            if(event.key == key){
                fn()
            }
        }
        window.addEventListener('keydown', handleKeydown)
        return () => {
            window.removeEventListener('keydown', handleKeydown)
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },deps)
}

export default useKeyDown