import React,{createContext,useState,useEffect} from 'react'
import {getLoggedUser,updateUserField,SignOut} from '../FireBase/firebase'
export const AuthContext =createContext({})
 

const AuthProvider=(props)=> {
    const [user, setUserContext] = useState({})
    const [isLogged, setisLogged] = useState(false)

    const [subjects, setsubjects] = useState(['tous les matiers','arab','francais','math','physic','biology'])
    const [packs, setpacks] = useState(['tous les pack','PACK1','PACK2','PACK3'])
  
    const logOut = ()=>{
        return SignOut().then(res=>{
            setisLogged(false)
            setUserContext({})
        })
    }
    const updateUser=(field,value)=> updateUserField(field,value,user.docId)
    const GetLoggedUserId=(AuthUid)=>{
        const succes =res=>{
            if(res.docs[0]){
                const userData= res.docs[0]._data;
                setUserContext({
                    docId:res.docs[0].id,
                    id:userData.userId,
                    type:userData.type,
                    firstName:userData.firstName,
                    userName:userData.userName,
                    lastName:userData.lastName,
                    image:userData.image,
                });
                return true ;
            }else return false
           }
         const errF =err=>console.log(err);
         
        return getLoggedUser(AuthUid,succes,errF)
    }


    return (
        <AuthContext.Provider value={{
                 user,
                 isLogged,
                 packs,
                 subjects,
                 setUserContext,
                 GetLoggedUserId,
                 updateUser,
                 logOut
             }}>
           {props.children}
       </AuthContext.Provider>)
}

export default AuthProvider
