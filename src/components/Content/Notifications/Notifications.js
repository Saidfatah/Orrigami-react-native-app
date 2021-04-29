import React,{useContext,useRef, useEffect,useState} from 'react'
import {StyleSheet,FlatList,View,Text} from 'react-native'
import {getNotifs} from '../../../FireBase/firebase'
import Modal from '../../wrrapersAndElems/ModalWrraper'
import Notif from './Notif'
import {AuthContext} from '../../../Context/AuthProvider'


const Notifications=({modalVisible,setmodalVisible,setNotifs, setsetNotifs,setnotifsCount,navigation})=>{ 
    const {user}= useContext(AuthContext)
    const [notifs, setnotifs] = useState([]) 
    const [noNotifs, setnoNotifs] = useState(false)

    const isMounted = useRef(false)
    useEffect(() => {  
        isMounted.current = true
        if(notifs.length <1 && user.id && !setNotifs)
        {
         console.log('get notifs')
        getNotifs(user.id)
        .then(res=>{
            if(isMounted.current == true)
            {
            if(res.docs[0] == undefined) return setnoNotifs(true)
            if(res.docs[0] != undefined ){
                 const notifs =res.docs.map(notif=>({
                     id:notif.id,
                     hasAction:true,
                     action:notif._data.action,
                     topic:notif._data.topic, 
                     client:notif._data.client, 
                     title:notif._data.title,
                     checked:notif._data.checked,
                     owner_uid:notif._data.owner_uid,
               }));
               setnotifs(notifs);
               setnotifsCount(notifs.length);
               setsetNotifs(true)
            }
            }
        })
        .catch(err=>console.log(err))
        }
        return ()=>{isMounted.current = false }
    }, [])



    const mprops = {
        modalVisible:modalVisible,
        setmodalVisible:setmodalVisible,
        height:500,
        width:'100%',
        title:"Notifications"
    }
    return <Modal {...mprops}>
     <View style={styles.notifs}>
        {noNotifs
        ?<Text style={{textAlign:'center'}} >you have 0 notificatons</Text>
        :<FlatList 
            data={notifs}
            renderItem={({item,index})=><Notif {...{setmodalVisible,navigation,key:index,notif:item}}/>}
            keyExtractor={(item,index)=>index.toString()}
        />
        }
     </View>
   </Modal>
}

var styles = StyleSheet.create({
    modalContainer:{
        justifyContent:'center',
        height:'100%',
        padding:16,
        alignItems:'center'
    },
    modal:{
        width:250,
        height:'100%',
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:25,
        padding:16,
    },
    notif:{
        width:'100%',
        marginBottom:8,
        shadowOffset: { width: 0, height: 2},
        backgroundColor:'#fff',
        padding:8,
        borderRadius:12

    },
    notifs:{
        width:'100%',
    },
    FRB:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}
 });

export default Notifications
