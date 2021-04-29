import React,{useContext,useState} from 'react'
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import IOcon from 'react-native-vector-icons/Ionicons'
import {AuthContext} from '../../Context/AuthProvider'
import NotificationsModal from './Notifications/Notifications'
import Loading from '../wrrapersAndElems/Loading'
import { CommonActions } from '@react-navigation/native';
import HeaderWrraper from '../wrrapersAndElems/HeaderWrapper'

const Header=({navigation})=>{
    const {logOut,user}= useContext(AuthContext)

    const [notifsCount, setnotifsCount] = useState(0)
    const [notifsCountVisible, setnotifsCountVisible] = useState(true)
    const [modalVisible, setmodalVisible] = useState(false)
    const [logginOut, setlogginOut] = useState(false)
    const [setNotifs, setsetNotifs] = useState(false)
    const AccountSettings=()=>{
        const logoutFunc = ()=>{
            setlogginOut(true)
            logOut()
            .then(r=>{
                setlogginOut(false)
                navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{ name:'login'}],
                    })
               );
            })
            .catch(err=>console.log(err))
        }
        return <TouchableOpacity onPress={()=>logoutFunc()}>
        <View style={styles.FRB}>
            {  logginOut
               ? <Loading height={50} />
               :<IOcon name="settings-sharp" size={25} color='#fff' /> 
            }
             <Text style={{color:'#fff'}}>Logout</Text>
        </View> 
     </TouchableOpacity>
    }
    const showNotifs=()=>{
        setnotifsCountVisible(false)
        setmodalVisible(true)
    }
 

    return  <HeaderWrraper  >
              <AccountSettings />
              <View style={styles.FRB} >
                  <Text style={{color:'#fff'}}>{user.userName || 'userName'}</Text>
                  <TouchableOpacity disabled={notifsCount<0} onPress={showNotifs}>
                      <View style={{position:'relative',marginLeft:16}}>
                      <IOcon name="notifications" size={25} color='#fff' />
                     { notifsCountVisible && notifsCount>0
                      ?<View style={styles.notifCount}>
                          <Text style={{color:'#fff'}}>{notifsCount}</Text>
                       </View>
                      :<View/>
                      }
                  </View> 
                  </TouchableOpacity>
                  <NotificationsModal {...{modalVisible,setmodalVisible,setNotifs, setsetNotifs,setnotifsCount,navigation}} />
              </View>      
            </HeaderWrraper>
}



var styles = StyleSheet.create({
    notifCount:{
          width:20,height:20,
          justifyContent:'center',alignItems:'center',
          backgroundColor:'red',
          borderRadius:50,
          position:'absolute',top:0,left:10,zIndex:99

    },
    FRB:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
 });
export default Header
