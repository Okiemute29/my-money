import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogout = () => {
    const [isCanced, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the use out 
        try{
            await projectAuth.signOut()

            // dspatch logout action
            dispatch({type: "LOGOUT"})

            // update state 
            if(!isCanced){
                setIsPending(false)
                setError(null)

            }
        }catch (err){
            // update state 
            if(!isCanced){
                setIsPending(false)
                setError(null)

            }
        }
    }
    useEffect(()=>{
        return () => setIsCancel(true)
    }, [])
    return {logout, isPending, error}
}


