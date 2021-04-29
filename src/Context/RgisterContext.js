import React ,{createContext,useState,useEffect} from 'react'
export const RegisterContext =createContext()
import {setUser} from '../FireBase/firebase'

const RgisterContext=(props)=> {
    const [userRegisternfo, setuserRegisternfo] = useState({
        firstName:'hamid',
        lastName:'ali',
        userName:'Rustyy',
        type:'STUDENT',
        updatedImage:false,
        email:'hamdil@hamdil.com',
        password:'123456',
        image :'no image',
        phone:'060458795',
        address:'some addres okkay ! ',
        birth:new Date(1598051730000),
      })
     
    const Register=()=>{
        const {email,password}= userRegisternfo
        return setUser(email,password,userRegisternfo)
         
    }
    const handelChange=input=>v=>{
        setuserRegisternfo({...userRegisternfo,[input]:v})
    }
 
    return (
        <RegisterContext.Provider value={{userRegisternfo,Register,handelChange}}>
           {props.children}
       </RegisterContext.Provider>
    )
}

export default RgisterContext
