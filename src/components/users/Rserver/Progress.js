import React,{useContext} from 'react'
import {StyleSheet,View,TouchableNativeFeedback,Text} from 'react-native'
import { colors } from '../../../styles/variables'
import { useNavigation } from '@react-navigation/native';
import {HeaderBackButton} from '@react-navigation/stack'
import {ReservationContext} from "../../../Context/Rservation"

const Progress=()=> {
    const navigation = useNavigation();
    const {index,setindex} = useContext(ReservationContext)
    const Line=()=><View style={{height:1,width:100,backgroundColor:'#fff'}}></View>
    const navigate=(route,i)=>{navigation.navigate(route);setindex(i)}
    return (
        <View style={{width:'100%',paddingHorizontal:16}}>
         <View style={{flexDirection:'row',alignItems:'center',marginBottom:16,justifyContent:'flex-start',width:'100%'}}>
             <HeaderBackButton  tintColor='#fff' 
             style={{marginRight:25,width:0,justifyContent:'center'}} 
             onPress={() => {
                 if(navigation.canGoBack()) return navigation.goBack()
                 navigation.navigate('Home')
             }}/>
             <Text style={{color:'#fff',fontSize:20}}>Reserver une session</Text>
         </View>
         <View style={styles.progress}>
                 <TouchableNativeFeedback onPress={()=>navigate('Type',1)}>
                     <View style={styles.flex}>
                         <View style={{...styles.step,backgroundColor:index==1?'#fff':'transparent'}}>
                           <Text style={{color:index==1?colors.colors[1]:'#fff'}}>1</Text>
                         </View>
                     </View>
                 </TouchableNativeFeedback>
                 <Line />
                 <TouchableNativeFeedback onPress={()=>navigate('Subject',2)}>
                     <View style={styles.flex}>
                         <View style={{...styles.step,backgroundColor:index==2?'#fff':'transparent'}}>
                           <Text style={{color:index==2?colors.colors[1]:'#fff'}}>2</Text>
                         </View>
                     </View>
                 </TouchableNativeFeedback>
                 <Line />
                 <TouchableNativeFeedback onPress={()=>navigate('Payment',3)}>
                     <View style={styles.flex}>
                         <View style={{...styles.step,backgroundColor:index==3?'#fff':'transparent'}}>
                           <Text style={{color:index==3?colors.colors[1]:'#fff'}}>3</Text>
                         </View>
                     </View>
                 </TouchableNativeFeedback>
               
         </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    progress:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        backgroundColor:'transparent'
        },
    step:{  
        width:40,
        height:40,
        borderRadius:100,
        borderColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2
    },
    flex:{  
        alignItems:'center',
    },
})
export default Progress
