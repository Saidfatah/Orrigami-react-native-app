import React from 'react'
import {FlatList} from 'react-native'
import Reservation from './Reservation'

const Reservations=({setclientPhone,reservations,setselectedReservation,setmodalVisible})=> {
    return (
        <FlatList 
         data={reservations}
         renderItem={({item})=><Reservation {...{ setclientPhone,item,setmodalVisible,setselectedReservation }}/>}
         keyExtractor={(item,index)=>index.toString()}
        />
    )
}

export default Reservations
