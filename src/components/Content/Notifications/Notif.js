import React from 'react'
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import { colors } from '../../../styles/variables'
import {checkNotif as checkNotifApi} from '../../../FireBase/firebase'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'

const Notif=({notif,setmodalVisible,navigation})=>{
    const {topic,title,action,owner_uid,client,id} = notif

    const checkNotif=async()=>{
         setmodalVisible(false)

         try {
             const checkNotifPromise=await checkNotifApi(id)
             console.log(checkNotifPromise)
             if(checkNotifPromise)console.log('checked notif')
         } catch (error) {
             console.log(error)
         }

         if(action == undefined ) return ;
         
         navigation.navigate(action.route,{...action.params})
    }

    return <TouchableOpacity onPress={()=>checkNotif()} >
         <Gradiant style={styles.notif} >
             <Text style={{color:'#fff'}}>sujet:{title}</Text>
             <View style={styles.FRB}>
                  <Text style={styles.txt}> 20:30</Text>
                  <Text style={styles.txt}> tutor</Text>
             </View>
         </Gradiant>
    </TouchableOpacity>
    
}

var styles = StyleSheet.create({
    txt:{fontStyle:'italic',color:colors.grey},
    notif:{
        width:'100%',
        marginBottom:8,
        shadowOffset: { width: 0, height: 2},
        backgroundColor:'#fff',
        padding:8,
        borderRadius:12

    },
    FRB:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}
 });
 export default Notif