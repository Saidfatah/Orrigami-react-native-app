import React from 'react'
import { View ,Text,StyleSheet} from 'react-native'
import Plan from './Plan'
import {colors} from '../../../../styles/variables'

const Individual=({plans,setcheckedValues,checkedValues})=> {
    console.log({plans})

    return (
        <View>
            <Text style={styles.Title}>Choisir un pack</Text>
                 {plans.map((p,index)=><Plan 
                   plans={plans}
                   setcheckedValues={setcheckedValues}
                   checkedValues={checkedValues}
                   key={index} 
                   title={p.title} 
                   price={p.price} 
                   index={index} 
                   touchable={true} />)
                  }
         </View>
    )
}

var styles = StyleSheet.create({
    Title:{
       fontSize:25,
       color:"#fff",
       marginBottom:8,
       textAlign:'left'
    },
});

export default Individual
