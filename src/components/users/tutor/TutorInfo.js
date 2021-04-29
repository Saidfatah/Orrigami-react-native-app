import React,{useContext} from 'react'
import {StyleSheet,Text, View} from 'react-native'
import {AuthContext} from '../../../Context/AuthProvider'


const  TutorInfo=()=> {
    const {user} = useContext(AuthContext)
    return (
        <View style={styles.info}>
            <View>
                          <Text style={{color:'#fff',fontSize:20}}>{user.userName}</Text>
                          <Text style={{color:'#fff',fontSize:14}}>teaching {['arrab','francasi'].map(s=> s +' and ')}</Text>
                     </View>
            <View style={{flexDirection:'row'}}>
                          <View style={{marginRight:16}}>
                                 <Text style={{color:'#fff',fontSize:12}}>math</Text>
                                 <Text style={styles.session}>10 seances</Text>
                          </View>
                          <View>
                                 <Text style={{color:'#fff',fontSize:12}}>physics</Text>
                                 <Text style={styles.session}>3 seances</Text>
                          </View>
                     </View>
       </View>
    )
}

var styles = StyleSheet.create({
    info:{
        marginLeft:8,
        flex:2,
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    session:{color:"#fff",fontSize:12},
 });
export default TutorInfo
