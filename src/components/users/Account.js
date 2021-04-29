import React,{useContext} from 'react'
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import {AuthContext} from '../../Context/AuthProvider'
import IOcon from 'react-native-vector-icons/Ionicons'

const Account =({navigation})=> {
    const {logOut} = useContext(AuthContext)
    return (
        <View>
            <TouchableOpacity onPress={()=>logOut()}>
                <View style={styles.FRB}>
                    <IOcon name="settings-sharp" size={25} color='#fff' />
                    <Text style={{color:'#fff'}}>Account</Text>
                 </View> 
            </TouchableOpacity>
        </View>
    )
}

var styles = StyleSheet.create({
    FRB:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}
 });
export default Account
