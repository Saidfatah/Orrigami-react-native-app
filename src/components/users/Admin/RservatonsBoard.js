import React,{useState,useEffect} from 'react'
import {getAllReservations,getTutors} from '../../../FireBase/firebase'
import {StyleSheet,View} from 'react-native'
import ContactModal from './ContactModal'
import Loading from '../../wrrapersAndElems/Loading'
import Reservations from './Reservations'
import Filter from './Filter'
import Header from './Header'

const RservatonsBoard=()=> {
    const [reservations, setreservations] = useState([])
    const [reservationsRender, setreservationsRender] = useState([])
    const [tutors, settutors] = useState([])
    const [modalVisible, setmodalVisible] = useState(false)
    const [selectedReservation, setselectedReservation] = useState({})
    const [clientPhone, setclientPhone] = useState('')

    const LoadReservations=()=>{
        if(reservations.length<1)
        getAllReservations(snapshot=>{
            setreservations(snapshot.docs.map(doc=>
                  {
                      const data= doc._data;
                      
                      if(data.isIndividual)
                      return({
                         client_id: data.client_id,
                         full_name: data.client.full_name,
                         phone:     data.client.phone,
                         isIndividual:true,
                         status:    data.status,
                         subject:   data.subject,
                         titre:     data.topic,
                         topic:     data.topic,
                         plan:      data.plan,
                         client:    data.client,
                         scheduled: data.scheduled,
                         stage:     data.stage
                      })
                      else
                       return({
                         client_id:data.client_id,
                         isIndividual:false,
                         status:data.status,
                         group:{
                             groupName:data.group[0].title,
                             id:data.group[0].id,
                             tutor : data.group[0].tutors[0],
                             attendents:data.group[0].members,
                         },
                         plan:data.plan,
                         client:data.client
                       })
                  } ))
         })
    }

    useEffect(() => {
        LoadReservations()
        let unsub ; 
        if(tutors.length <1)
         {
             unsub= getTutors()
              .then(res=>{
                  settutors( res.docs.map(t=>({
                    phone:t._data.phone,
                    name : t._data.userName,
                    id:  t._data.userId,
                    skills:t._data.skills,
                    email:  t._data.email,
                   })))
              })
              .catch(err=>console.log(err))
        }
        if(reservations.length>1)setreservationsRender(reservations)
   }, [reservations.length,reservationsRender.lenght])


    if(reservations.length<1)
    return <View style={styles.loading}><Loading /></View>
    return (
        <View>
            <Header />
            <View style={styles.rBoard}>
                 <Filter {...{setreservationsRender,reservations}} />
                 <ContactModal {...{modalVisible,tutors, setmodalVisible,clientPhone,selectedReservation}} />
                 <Reservations  {...{setclientPhone,setselectedReservation,setmodalVisible,reservations}} />
            </View>
        </View>
    )

}

const styles =StyleSheet.create({
    rBoard:{
        padding:16,
        backgroundColor:'#fff',
        height:'100%'
    },
    loading:{
        padding:16,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    },
})

export default RservatonsBoard
