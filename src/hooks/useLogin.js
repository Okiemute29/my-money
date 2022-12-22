import { useEffect, useState } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
    const [isCanced, setIsCancel] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign the use out 
        try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dspatch logout action
            dispatch({type: "LOGIN", payload: res.user})

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
    return {login, isPending, error}
}


