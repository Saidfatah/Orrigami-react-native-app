import React,{createContext,useState,useEffect} from 'react'
export const ReservationContext =createContext()
const Rservation=(props)=> {

     const [nexUser, setnexUser] = useState({
         userId:'',
         userInfo:{},
         isIndividual:true,
         subject:'',
         plan:'',
         topic:'',
         plan:'PACK1',
         group:null,
         Date:'',
     })
     const [topicContext, settopicContext] = useState('topic')
     const [index, setindex] = useState(1)
     const [plans, setplans] = useState([
         {title:'PACK1',price:100},
         {title:'PACK2',price:200},
         {title:'PACK3',price:300}
     ])

     const handelChange=input=>v=>{
           console.log('handle change'+ v)
           setnexUser({...nexUser,[input]:v})
     }

    useEffect(()=>{
       
    },[nexUser])
    return (
        <ReservationContext.Provider value={{topicContext,settopicContext, nexUser,plans,index,setindex,handelChange}}>
           {props.children}
       </ReservationContext.Provider>)
}

export default Rservation
