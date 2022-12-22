import { useReducer, useEffect, useState  } from "react";
import { projectFirestore, timestamp } from "../firebase/config";


let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case "IS_PENDING":
            return {document: null, success: false, error: null, isPending: true}
        case "ADDED_DOCUMENT":
            return { isPending: false, document: action.payload, success: true, error: null }
        case "ERROR":
            return { isPending: false, document: null, success: false, error: action.payload}
        case "DELEED_DOCUMENT":
            return { isPending: false, document: null, success: true, }

        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancel, setIsCancel] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(collection)

    // only dispatch if not cancel

    const dispatchIfNotCancel = (action) =>{
        if (!isCancel){
            dispatch(action)
        }
    }

    // add document
    const addDocument = async (doc) =>{
        dispatch({type: "IS_PENDING", })
        try{
            const createdAt = timestamp.fromDate(new Date())
           const addedDocument = await ref.add({...doc, createdAt})
           dispatchIfNotCancel({type: 'ADDED_DOCUMENT', payload: addedDocument})
        }catch(err){
            dispatchIfNotCancel({type: "ERROR", payload: err.message})
        }
    }

     // delete document
     const deleteDocument = async (id) =>{
        dispatch({type: "IS_PENDING"})

        try{
            await ref.doc(id).delete()
            dispatchIfNotCancel({type: "DELETED_DOCUMENT"})
        }catch(err){
            dispatchIfNotCancel({type: "ERROR", payload: 'could not delete'})
        }
    }


    useEffect(()=>{
        return ()=>{
            setIsCancel(true)
        }
    }, [])

    return { addDocument, deleteDocument, response }
}