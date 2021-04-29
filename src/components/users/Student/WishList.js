import React, { useState } from 'react'
import {StyleSheet, View, Text,TouchableOpacity, FlatList} from 'react-native'
import {colors} from '../../../styles/variables'
import Icon from 'react-native-vector-icons/FontAwesome'


const WishList=()=>{
    const [wishList,setWishList]=useState(['Math algebra','Gravity','Friction Powers','frensh','Math algebra','Gravity','Friction Powers','frensh','Math algebra','Gravity','Friction Powers','frensh'])
    const wishListItem =({item})=>{
        return <View style={{
                     display:'flex',
                     justifyContent:'space-between',
                     marginBottom:8,
                     flexDirection:'row'}}>
                   <Text>{item}</Text>
                    <TouchableOpacity onPress={()=>{console.log('navgate to course')}}>
                           <Icon   
                            name={'external-link-square'} 
                            style={{color:colors.colors[2]}} 
                            size={25}/>
                    </TouchableOpacity>
                </View>
    }
    return <View  style={{padding:16}}>
    {/* <Text style={{fontSize:20,color:colors.colors[2]}}>My Wish List</Text>
        <FlatList 
           data={wishList}
           renderItem={listItem}
           keyExtractor={(item,index)=>index.toString()}
        /> */}
     </View>
}
export default WishList
