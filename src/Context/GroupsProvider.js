import React,{createContext,useState,useEffect} from 'react'
import {getGroups} from '../FireBase/firebase'
export const GroupsContext =createContext()
const  GroupsProvider=(props)=> {
     const [limit, setlimit] = useState(3)
     const [moanted, setmoanted] = useState(true)
    const images = [
          {
           image:require('../images/Docs/frensh.png'),
           subject:'francais',
          },
          {
           image:require('../images/Docs/english.png'),
           subject:'anglais',
          },
          {
           image:require('../images/Docs/physics.png'),
           subject:'physics',
          },
          {
           image:require('../images/Docs/math.png'),
           subject:'math',
          },
          {
           image:require('../images/Docs/arab.png'),
           subject:'arab',
          },
          {
           image:require('../images/Docs/biology.jpg'),
           subject:'biology',
          },
    ] 
    const [groups, setgroups] = useState([])

    useEffect(()=>{
      setmoanted(true)
      getGroups(limit)
      .then(res=>{
           if(res.docs[0] != undefined && moanted)
           {
                console.log('loading')
                const docsMpaed= res.docs.map(d=>({
                       id:d.id,
                       title:d._data.title,
                       open:d._data.open,
                       members:d._data.members,
                       tutors:d._data.tutors,
                       subject: d._data.subject,
                       image:images[0].image
                }))
                setgroups(docsMpaed)
           }
      })
      .catch(err=>console.log(err))

      return () => {
          setmoanted(false)
      }
    },[])


    return (
     <GroupsContext.Provider value={{ groups,setgroups}}>
        {props.children}
    </GroupsContext.Provider>)
}

export default GroupsProvider
