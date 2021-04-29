import React,{useContext} from 'react'
import { View ,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import {ReservationContext} from '../../../../Context/Rservation'
import {colors} from '../../../../styles/variables'

const Plan=({title,price,index,touchable,setcheckedValues,checkedValues})=>{
    const {plans,handelChange}=useContext(ReservationContext)

    const chosePlan=index=>{
        const v= [...checkedValues.map(v=>false)]
        v[index] = true
        handelChange('plan')(plans[index])
        setcheckedValues([...v])
    }

    return <TouchableNativeFeedback  onPress={touchable?()=>chosePlan(index):null}>
        <View style={styles.plan}>
            {index >=0 
            ?<View style={{
                ...styles.checkBox,
                ...checkedValues[index]
                ?styles.checked
                :styles.unchecked
               }}></View>
            :<View/>
            }
            <Text>{title}</Text>
            <Text>{price} Dhm</Text>
      </View>
    </TouchableNativeFeedback>
}
var styles = StyleSheet.create({
    plan:{
       width:'100%',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-evenly',
       height:50,
       padding:16,
       backgroundColor:'#fff',
       marginBottom:16,
       borderRadius:15
    },
    checkBox:{
       width:15,
       height:15,
       borderRadius:100,
       borderColor:colors.colors[1],
       borderWidth:2
    },
    checked:{
       backgroundColor:colors.colors[1],
   
    },
    unchecked:{
       backgroundColor:'#fff',
       borderColor:colors.colors[1],
    },
    Title:{
       fontSize:25,
       color:'#fff',
       marginBottom:8,
       textAlign:'left'
    },
    text:{
       fontSize:20,
       textAlign:'center',
       color:colors.black
    },
});

export default Plan
