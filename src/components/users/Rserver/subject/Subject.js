import React,{useContext} from 'react'
import {View} from 'react-native'
import {ReservationContext} from '../../../../Context/Rservation'
import Individual from './Indivdual'
import Group from './Group'

const Subject=(props)=> {
    const {nexUser}=useContext(ReservationContext)
    const {isIndividual}=nexUser

    return (
        <View>
             {isIndividual?<Individual {...props} />:<Group {...props}/>}
        </View>
    )
}


 export default Subject
