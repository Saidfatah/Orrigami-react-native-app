import React,{useState,useEffect} from 'react'
import {StyleSheet,View,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

const Rating=({rating,setrating})=> {
    const [stars, setstars] = useState([true,true,true,true,false])
     useEffect(() => {
        setstars(stars.map((s,i)=> (i+1)<=rating ))
     }, [rating])
    
     const rate = (index)=>{
         const sratsTemp = [...stars]
         sratsTemp[index]=!sratsTemp[index]
         setstars([...sratsTemp])
         setrating(index+1)
     }

    return (
        <View style={styles.rating} >
            {
                stars.map((s,i)=><TouchableOpacity key={i} onPress={()=>rate(i)}>
                    <Icon name={s?'star':'staro'} color='#FFDF00' size={25} />
                </TouchableOpacity>)
            }
        </View>
    )
}


var styles = StyleSheet.create({
    rating:{
       padding:12,
       backgroundColor:'#fff',
       flexDirection:'row',
       alignItems:'center'
    },
  
 });
export default Rating
