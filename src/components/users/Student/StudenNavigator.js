import React from 'react'
import {colors} from '../../../styles/variables'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import WishList  from './WishList'
import CoursesList from './MyCourses'
import Icon from 'react-native-vector-icons/FontAwesome'

// const Tab = createMaterialTopTabNavigator()
const StepsNavigator =()=> {
    // const props = {
    //     tabBarOptions:{
    //         showLabel:true,
    //         showIcon:true,
    //         activeTintColor:colors.colors[1],
    //         inactiveTintColor:colors.grey,
    //         style:{height:50},
    //         tabStyle:{
    //          flexDirection: 'row',
    //          justifyContent:'center',
    //          alignItems:'center'
    //         },
    //         cardStyle: { backgroundColor: "transparent" },
    //         indicatorStyle:{borderBottomWidth: 0,height:5,backgroundColor:colors.colors[1]}
    //     } ,
    //     nitialRouteName:"MyCourses" ,
    //     swipeEnabled:false
    // }
    //  return (
    //   <Tab.Navigator {...props} >
    //        <Tab.Screen      name='MyCourses'    
    //                         options= { { tabBarIcon:({focused,color})=> <Icon  name={'book'} color={color} size={25}/> }}
    //                         component={CoursesList}/>
    //        <Tab.Screen      name='WishList'    
    //                         options= { { tabBarIcon:({focused,color})=><Icon  name={'list-ul'} color={color} size={25}/> }}
    //                         component={WishList} />
    //  </Tab.Navigator>
    //  )
    return <CoursesList />
 }

 export default StepsNavigator