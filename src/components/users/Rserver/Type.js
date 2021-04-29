import React,{useContext} from 'react'
import {StyleSheet,View,TouchableNativeFeedback,Text} from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import {colors} from '../../../styles/variables'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import {ReservationContext} from '../../../Context/Rservation'


const  Type =({navigation})=> {
    const {nexUser,handelChange,setindex}=useContext(ReservationContext)

    const chooseType=Individual=>{
        console.log(nexUser.isIndividual)
        handelChange('isIndividual')(Individual)
        setindex(2)
        navigation.navigate('Subject',{type:Individual})
    } 
    return (
        <Gradiant style={{height:'100%',justifyContent:'center',padding:16}}>
        <View style={styles.type}>
            <Text style={styles.Title}>Chosir le type de reservation </Text>
             <TouchableNativeFeedback onPress={e=>chooseType(false)}>
                 <View style={!nexUser.isIndividual?styles.btn:styles.Inbtn}>
                     <Icon name='persons'  style={styles.icon}/>
                     <Text style={styles.text}>En Group</Text>
                 </View>
             </TouchableNativeFeedback>
             <TouchableNativeFeedback onPress={e=>chooseType(true)}>
                <View  style={nexUser.isIndividual?styles.btn:styles.Inbtn}>
                     <Icon name='person'  style={styles.icon}/>
                     <Text style={styles.text}>Individual</Text>
                </View>
             </TouchableNativeFeedback>
        </View>
        </Gradiant>
    )
}
var styles = StyleSheet.create({
    btn:{
        width:'100%',
        backgroundColor:'#fff',
        padding:16,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
     Inbtn:{
        width:'100%',
        backgroundColor:'#e2e2e2',
        opacity:.8,
        padding:16,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
   
     Title:{
        fontSize:25,
        textAlign:'center',
        color:'#fff',
        marginBottom:32
     },
     icon:{
        fontSize:20,
        marginRight:16,
        color:colors.black
     },
     text:{
        fontSize:20,
        color:colors.black
     },
 });
export default Type
