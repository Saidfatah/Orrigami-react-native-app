import React,{useContext,useEffect,useState} from 'react'
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import CustomBarComponent from './CustomBarComponent'
import Loading from '../../wrrapersAndElems/Loading'
import {View} from 'react-native'
import Profil from '../../users/Profil'
import Reserver from '../../users/Rserver/Reserver'
import Chat from '../../users/Chat/Chat'
import RservationsBoard from '../../users/Admin/RservatonsBoard'
import Content from '../../Content/Content'
import {getAuth} from '../../../FireBase/firebase'
import {AuthContext} from '../../../Context/AuthProvider'







const Tab = createBottomTabNavigator();
const StyledBottomTab=({navigation})=> {
const {user,GetLoggedUserId}= useContext(AuthContext)
const [TYPE, setTYPE] = useState(undefined)


useEffect(() => {
        let getUserListner ;
        let getAuthUnsub ;
        if(user.type)setTYPE(user.type)
        if(user.type == undefined ){
                getAuthUnsub = getAuth(AuthUser=>{
                       if(AuthUser) getUserListner=GetLoggedUserId(AuthUser.uid)
                })
        }

        return () => {
             getUserListner && getUserListner();
             getAuthUnsub && getAuthUnsub();
        }

}, [user.type])


if(TYPE == undefined) return <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}><Loading /></View>
if(TYPE =='ADMIN')  {   
    return<Tab.Navigator 
    tabBar={CustomBarComponent} 
    initialRouteName="Home"
    tabBarOptions={{  activeTintColor: "#fff", 
    inactiveTintColor: "#ddd",
    keyboardHidesTabBar:true
    }}>
         <Tab.Screen name="Home" 
                 component={Content} 
                />
         <Tab.Screen name="Chat" 
                 component={Chat} 
                 />
         <Tab.Screen name="Rservations" 
                 component={RservationsBoard} 
                />
    </Tab.Navigator>}
if(TYPE =='STUDENT'){ 
        return<Tab.Navigator 
               tabBar={CustomBarComponent} 
               initialRouteName="Home"
               tabBarOptions={{  activeTintColor: "#fff", inactiveTintColor: "#ddd"}}>
     <Tab.Screen name="Home" 
             component={Content} 
             />
     <Tab.Screen name="Rserver"     
             component={Reserver} 
             options={{ tabBarVisible:false}} />
     <Tab.Screen name="Chat" 
             component={Chat} 
            />
     <Tab.Screen name='board'
             component={Profil}
            />

</Tab.Navigator>
}
if(TYPE =='TUTOR')  return <Tab.Navigator 
             tabBar={CustomBarComponent} 
             initialRouteName="Home"
             tabBarOptions={{  activeTintColor: "#fff", inactiveTintColor: "#ddd"}}  >
 <Tab.Screen name="Home" 
             component={Content} 
             />
  <Tab.Screen name="Chat" 
             component={Chat} 
             />
  <Tab.Screen name='board'   
             component={Profil}/>
</Tab.Navigator>
}

export default StyledBottomTab
