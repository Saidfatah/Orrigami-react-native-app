import React from 'react'
import Subject from './subject/Subject'
import Payment from './payment/Payment'
import Type from './Type'
import Progress from './Progress'
import GroupsProvider from '../../../Context/GroupsProvider'
import RservationProvider from '../../../Context/Rservation'
import {colors} from '../../../styles/variables'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import {Dimensions,StatusBar} from 'react-native'

const wheight = Dimensions.get('window').height
const stautsHeihgt = StatusBar.currentHeight

const Tab = createMaterialTopTabNavigator();
const StepsNavigator =()=> {
   console.log('resvation --------------------')
 

    return (
     <Tab.Navigator 
      tabBarOptions={{
      showLabel:true,
      activeTintColor:colors.colors[1],
      showIcon:false,
      style:{height:5,display:'none'},
      tabStyle:{padding:0},
      cardStyle: { backgroundColor: "transparent" },
      renderTabBarItem:false,
      indicatorStyle:{borderBottomWidth: 0,height:5}
      }}
      swipeEnabled={false}   
     >
          <Tab.Screen      name='Type'    
                           options= { { tabBarIcon:null }}
                           component={Type}/>
          <Tab.Screen      name='Subject'    
                           options= { { tabBarIcon:null }}
                           component={Subject} />
          <Tab.Screen      name='Payment'    
                           options= { { tabBarIcon:null }}
                           component={Payment} />
    </Tab.Navigator>
    )
}
const  Reserver=()=> {
    return (
            <GroupsProvider>
              <RservationProvider>
                <Gradiant style={{height:wheight-stautsHeihgt,justifyContent:'center'}}>
                   <Progress />
                   <StepsNavigator />
                </Gradiant>
              </RservationProvider>
           </GroupsProvider>
    )
}



export default Reserver
