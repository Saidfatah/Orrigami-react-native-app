import React from 'react'
import {StyleSheet} from 'react-native'
import PersonalDetails from './PersonalDetails'
import UserDetails from './UserDetails'
import Plann from './Plann'
import RegisterProvider from '../../../../Context/RgisterContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {colors} from '../../../../styles/variables'


const Tab = createMaterialTopTabNavigator();
const RegisterStepsStack=()=>{
  return <Tab.Navigator 
       tabBarOptions={{
         showLabel:true,
         activeTintColor:colors.colors[1],
         showIcon:false,
         style:{height:5,display:'none'},
         renderTabBarItem:false,
         indicatorStyle:{borderBottomWidth: 0,height:5}
       }}
       sceneContainerStyle={{backgroundColor: 'transparent'}}
       swipeEnabled={false}
       
       >
         <Tab.Screen      name='UserDetails'    
                          options= { { tabBarIcon:null }}
                        
                          component={UserDetails}/>
         <Tab.Screen      name='PersonalDetails'    
                          options= { { tabBarIcon:null, }}
                          component={PersonalDetails} />
         <Tab.Screen      name='Plan'    
                          options= { { tabBarIcon:null, }}
                          component={Plann} />
   </Tab.Navigator>
}
const Register=({navigation})=>{
  return (
  <RegisterProvider>
          <RegisterStepsStack/>
  </RegisterProvider>
  )

 }
 
 var styles = StyleSheet.create({
  registerGradiant:{
    width:'100%',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    padding:16
 },
 });
 export default Register
