import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator,HeaderBackButton,CardStyleInterpolators} from '@react-navigation/stack'
import StyledBottomTab from './StyledBottomTab/StyledBottomTab'
import { colors } from '../../styles/variables'
import {Easing} from 'react-native'
import {Home,Loggin,Register,UserType,PDFReader,CoursePage,Groups,Plannes,Plan,Account,MyStudents,Tutors,Conversation,RegisterTutor,CoursesPage,Documents} from './routes'
import GroupsProvider from '../../Context/GroupsProvider'

const Stack =createStackNavigator()
const Navgation=()=> {
    const GroupsMiddle = props =>{
    return <GroupsProvider> 
    <Groups {...props} />
    </GroupsProvider>
    }
    const bottomTabHeader=( route,navigation )=>{
      if(route.state)
      {
        // const routeName = route.state.routeNames[route.state.index] 
        //  if(routeName =='reserve' ){
        //    console.log('routeName'+routeName)
        //  return ({
        //   headerLeft:()=> ( <HeaderBackButton tintColor={colors.black} onPress={() => {navigation.navigate('board', { screen: 'Home' }); }}/> ),
        //   title:route.state?routeName:'Home'
        //  })}
        return {header:()=>null }
      }
    }
    const TutorRegisterHeader=( route,navigation )=>{
      return {
        headerLeft:()=> ( <HeaderBackButton tintColor={colors.black} onPress={() => {navigation.goBack(); }}/> ),
        title:route.state?routeName:'Register un instrecteur'
      }
    }

    const config = {
      animation:'spring',
      config:{
         stiffnes:1000,
         dampness:50,
         mass:3,     
         overShootClamping:false,
         restDisplacmentThreshold:0.01,
         restSpeedThreshold:0.01
       }
    }
    const closeConfig = {
      animation:'timing',
      config:{
         duration:500,
         easing:Easing.quad
       }
    }
    return (
        <NavigationContainer >
        <Stack.Navigator initialRouteName='home'  >
             <Stack.Screen
                           name="board"  
                           component={StyledBottomTab} 
                           options={({ route,navigation }) =>({header:()=>null })}/>
             <Stack.Screen name='groups'    
                           options={{  headerBackTitle:'Back',  headerTitle:'Groups' }} 
                           component={GroupsMiddle}/>
             <Stack.Screen name='pdf'
                           options={ ({ route}) =>({title:route.params.title ?route.params.title :'PDF' })}    
                           component={PDFReader} 
                           />
             <Stack.Screen name='documents'    
                           options={{
                             headerBackTitle:'Back',
                             headerTitle:'Documents',
                             cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
                             gestureDirection:'horizontal-inverted',
                             TransitionSpecs:{
                               open:config,
                               close:closeConfig
                              }
                           }} 
                           component={Documents} 
                           />
             <Stack.Screen name='courses'    
                           options={{
                             headerBackTitle:'Back',
                             headerTitle:'Courses',
                             cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
                             TransitionSpecs:{
                               open:config,
                               close:closeConfig
                              }
                            }
                          } 
                           component={CoursesPage} 
                           />
             <Stack.Screen name='course'  
                           options={({route,navigation})=>{
                             if(route.params)
                             return {
                               title:route.params.courseName,
                               headerLeft:()=> ( <HeaderBackButton tintColor={colors.black} onPress={() => {navigation.goBack(); }}/> ),
                              }
                           }} 
                           component={CoursePage} 
                           />
             <Stack.Screen name='tutors'    
                           options={{
                             headerBackTitle:'Back',
                             headerTitle:'Instructors',
                         }} 
                           component={Tutors} 
                           />
             <Stack.Screen name='home'    
                           options={{header:()=>null}} 
                           component={Home} 
                           />
 
             <Stack.Screen name='account'   
                           component={Account} 
                           />
             <Stack.Screen name='login'   
                           options={{header:()=>null}} 
                           component={Loggin} 
                           />
             <Stack.Screen name='typeRegister' 
                           component={UserType} 
                           options={{headerTitle:'Sign Up'}}
                           />
             <Stack.Screen name='register' 
                           component={Register} 
                           options={{headerTitle:'Sign Up'}}
                           />
             <Stack.Screen name='tutorRegister' 
                           component={RegisterTutor} 
                           options={({ route,navigation }) =>TutorRegisterHeader( route,navigation )}
                           />
             <Stack.Screen name='convo' 
                           component={Conversation} 
                           options={({ route,navigation }) =>{
                            return { title:'chat'}
                           }}
                           />
             <Stack.Screen name='plans' 
                           component={Plannes} 
                           options={({ route,navigation }) =>{
                            return { title:'Plannes'}
                           }}
                           />
             <Stack.Screen name='plan' 
                           component={Plan} 
                           options={({ route,navigation }) =>{
                            return { title:'Creer une novelle session'}
                           }}
                           />
             <Stack.Screen name='students' 
                           component={MyStudents} 
                           options={({ route,navigation }) =>{
                            return { title:'Plannes'}
                           }}
                           />
             
          </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navgation
