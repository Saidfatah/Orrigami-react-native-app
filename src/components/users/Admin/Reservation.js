import React from 'react'
import {StyleSheet,View,Text,TouchableWithoutFeedback} from 'react-native'
import { colors } from '../../../styles/variables'
import LinearGradient from 'react-native-linear-gradient'
import MTIcon from 'react-native-vector-icons/MaterialIcons'

const Reservation=({item,setclientPhone,setselectedReservation,setmodalVisible})=>{
    const {isIndividual}=item
    const gradient = {
        start:{x:0, y:1} ,
        end:{x: 0.75, y: .25} ,
        colors:colors.colors ,
        style:styles.resevervation,
    }
    const openContactModal=()=>{
        setselectedReservation(item)
        setclientPhone(item.client.phone)
        setmodalVisible(true)
    }
    console.log(item.group)

    if(isIndividual)
    return <TouchableWithoutFeedback onPress={()=>{openContactModal('IND')}} >
            <LinearGradient  {...gradient}>
                  <View style={{...styles.flexRB,marginBottom:4}}>
                        <Text style={styles.headerTitle}>{item.titre}</Text>
                        <Text style={{color:'#fff'}}>{item.full_name}</Text>
                  </View>
                  <View style={{...styles.flexRBJS}}>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.subject} </Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.plan} </Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>paid</Text>
                        </View>
                        {/* <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.status} </Text>
                        </View> */}
                        <View style={{...styles.tag,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:colors.black}}>individual</Text>
                            <MTIcon name="person" color={colors.black}/>
                        </View>
                  </View>
        </LinearGradient>
        </TouchableWithoutFeedback> 

    return <TouchableWithoutFeedback onPress={()=>{openContactModal('GRP')}}>
        <LinearGradient  {...gradient}>
                    <View style={{...styles.flexRB,marginBottom:4}}>
                          <Text style={styles.headerTitle}>{item.group.groupName}</Text>
                          <Text style={{color:'#fff'}}>{item.client.full_name}</Text>
                    </View>
                    <View style={{...styles.flexRB,flexWrap:'wrap',justifyContent:'flex-start'}}>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.group.attendents.length} members</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.plan} </Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={{color:colors.black}}>{item.status} </Text>
                        </View>
                        <View style={{...styles.tag,flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:colors.black}}>group</Text>
                            <MTIcon name="group" color={colors.black}/>
                        </View>
                  </View>
        </LinearGradient>  
    </TouchableWithoutFeedback>
}

const styles =StyleSheet.create({
    headerTitle:{
        color:'#fff',
        fontSize:16
    },
    tag:{
        paddingHorizontal:8,
        backgroundColor:colors.greyLight,
        borderRadius:12 ,
        marginRight:8,
        marginBottom:8
    },
    resevervation:{
        borderRadius:12 ,
        padding:8,
        marginBottom:8
    },
    flexRB:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    flexRBJS:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        justifyContent:'flex-start'
    },
})

export default Reservation
