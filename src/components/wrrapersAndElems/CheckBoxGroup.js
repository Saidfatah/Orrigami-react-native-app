import React,{useState,useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import {colors} from '../../styles/variables'

const CheckBoxGroup=({list,select,title})=> {

    const [values, setvalues] = useState([false,false,false])

    useEffect(() => {
        console.log(list)
         setvalues([...list.map(v=>false)])
        return () => {}
    }, [])

    const check = (index)=>{
        console.log(list[index])
        select(list[index])
        let valuesTemp = [...values]
        valuesTemp = valuesTemp.map(v=>false)
        valuesTemp[index]= true
        setvalues([...valuesTemp])
    }

    return (
    <View style={styles.planTypes}>
        <Text>{title}</Text>
        {
            values.map((v,i)=><TouchableOpacity key={i} onPress={()=>check(i)}>
            <View style={styles.planType}>
                <Text> {list[i]} </Text>
                <Icon 
                     name={v
                        ?"checkmark-circle"
                        :"checkmark-circle-outline"} 
                     size={20} 
                     color={colors.colors[2]} 
                />
            </View>
           </TouchableOpacity>
           )
        }
    </View>
    )
}

var styles = StyleSheet.create({
    planType:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        padding:4,
        elevation:5,
        margin:4,
    },
    planTypes:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'#fff',
        width:'100%',
        elevation:5,
        marginBottom:16,
        borderRadius:12,
        padding:8
    },
});
export default CheckBoxGroup
