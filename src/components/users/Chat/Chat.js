import React,{useState,useEffect,useContext} from 'react'
import {StyleSheet,View,Text,TouchableOpacity,} from 'react-native'
import {geChats} from '../../../FireBase/firebase'
import {AuthContext} from '../../../Context/AuthProvider'
import Loading from '../../wrrapersAndElems/Loading'
import Header from './Header'
import { lte } from 'lodash'

const Chat = ({navigation}) => {
     const [convos, setconvos] = useState([])
     const {user} = useContext(AuthContext)
     const [noConvos, setnoConvos] = useState(false)

     useEffect(() => {
        let unsubscribe 
        if(user.id){
        unsubscribe= geChats(
            user.id,
            ds=>{ 
                 const res = ds.docs
                 if(res[0] != undefined){
                     setnoConvos(false)
                     setconvos(res.map(c=>{
                         let firstname ; 
                         if(!c._data.isGroup){
                             firstname = [...c._data.members].filter(m=>m.id != user.id)[0].name;
                         }else {
                             firstname = c._data.title
                         }
                         
                         return {
                             convoId:c.id,
                             firstname,
                             lastMessage:c._data.latest_message 
                         }
                   }
                 ))
                 }else setnoConvos(true)
            },
            err=>{console.log(err)})
        }
        return()=>{unsubscribe && unsubscribe();}
    }, [user])

     const Convo =({other,lastMessage,convoId})=>{
         const openConvo=()=>{ navigation.navigate('convo',{name:other,chatId:convoId})}
         const compressMessage = lastMessage.substring(1, 25);
         return <TouchableOpacity onPress={openConvo}>
              <View style={styles.convo}>
                  <Text>{other}</Text>
                  <Text>{compressMessage}...</Text>
            </View>
         </TouchableOpacity>
     }


     return (
         <View>
             <Header />
             <View style={{padding:16}}>
                 {convos.length>0
                 ? convos.map((c,index)=><Convo key={index}  other={c.firstname} lastMessage={c.lastMessage}  convoId={c.convoId} />)
                 :<View style={{alignItems:'center',justifyContent:'center',height:'100%'}} >
                      {!noConvos
                          ? <Loading />
                          :<Text style={{color:'black',textAlign:'center'}} >You have no chats </Text>
                      }
                  </View>
                  }
             </View>
         </View>
 
     )
} 



var styles = StyleSheet.create({
    convo:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:8,
        height:50,
        borderRadius:15,
        backgroundColor:'#fff',
        margin:2
    }
 });


 export default Chat
