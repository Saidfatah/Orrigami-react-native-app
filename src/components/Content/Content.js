import React,{useContext, useEffect,useState} from 'react'
import {StyleSheet,Dimensions,TouchableOpacity,StatusBar,View,Text} from 'react-native'
import { colors } from '../../styles/variables';
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontisto from 'react-native-vector-icons/Fontisto'
import {AuthContext} from '../../Context/AuthProvider'
import LogoComp from '../../Animations/Logo'
import Header from './Header'


const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height ;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
const height = Dimensions.get('window').height -navbarHeight -60;
const width = Dimensions.get('window').width;
const widthOffset=50
const tabBarHeight=50

const Content =({navigation}) =>{
    const {isLogged,user}= useContext(AuthContext)
    const [routes, setroutes] = useState({})
    const [labels, setlabels] = useState({})

   
    useEffect(() => {
        if(user && user.type)
        {
            if(user.type =='STUDENT'){
                setroutes({top:'groups',bottom:'tutors',left:'documents',right:'courses'})
                setlabels({top:'Groups',bottom:'Tutors',left:'Documents',right:'Courses'})
               }
            if(user.type =='ADMIN'){
                setroutes({top:'students',bottom:'tutors',left:'groups',right:'courses'})
                setlabels({top:'Students',bottom:'Tutors',left:'Groups',right:'Courses'})
   
               }
            if(user.type =='TUTOR'){
                setroutes({top:'groups',bottom:'courses',left:'students',right:'plans'})
                setlabels({top:'Groups',bottom:'Courses',left:'My students',right:'Planns'})
               }
        } 
     }, [isLogged])

    const Routes = ()=>{
        const navigateTo=route=>navigation.navigate(route)
        const gradient = {
            start:{x:0, y:1} ,
            end:{x: 0.75, y: .25} ,
            colors:colors.colors ,
            style:styles.linearGradient,
       }
        const TopButton=()=>{
            return <TouchableOpacity
            style={{...styles.route,...styles.top } }
            onPress={e=>navigateTo(routes.top)}>
              <LinearGradient  {...gradient}>
                     <Icon name='group'  style={styles.icon}/>
                     <Text style={styles.text}>{labels.top}</Text>
             </LinearGradient>
        </TouchableOpacity>
        }
        const BttomButton=()=>{
            return <TouchableOpacity  
            style={{...styles.route,...styles.bottom}} 
            onPress={e=>navigateTo(routes.bottom)}>
                <LinearGradient  {...gradient}>
                     <IconFontisto name='persons'  style={styles.icon}/>
                     <Text style={styles.text}>{labels.bottom}</Text>
               </LinearGradient>
        </TouchableOpacity>
        }
        const LeftButton=()=>{
            return <TouchableOpacity   
            style={{...styles.route,...styles.left }} 
            onPress={e=>navigateTo(routes.left)}>
              <LinearGradient  {...gradient}>
                   <IconEntypo name='documents' style={styles.icon}/>
                   <Text style={styles.text}>{labels.left}</Text>
              </LinearGradient>
        </TouchableOpacity>
        }
        const RightButton=()=>{
            return <TouchableOpacity  
            style={{...styles.route,...styles.right}}  
            onPress={e=>navigateTo(routes.right)}>
              <LinearGradient  {...gradient}>
                  <Icon name='book'  style={styles.icon}/>
                  <Text style={styles.text}>{labels.right}</Text>
              </LinearGradient>
        </TouchableOpacity>
        }
        
        return <View style={styles.routes} >
        <LogoComp/>
        <TopButton/>
        <BttomButton/>
        <LeftButton/>
        <RightButton/>
       </View>
    }

    if(routes.right != undefined && labels.right != undefined)
     return <View>
         <Header navigation={navigation} />
         <Routes />
     </View>
    else  return <LogoComp/>
}


var styles = StyleSheet.create({
    text:{
      color:"#fff",
      fontSize:12
    },
    linearGradient:{
        width:100,
        height:100,
        borderRadius:25,
        padding:16,
        justifyContent:'center',
        alignItems:'center',
    },
    routes:{
        position:'relative',
        height:screenHeight,
        backgroundColor:'#fff'
    },
    route:{
        backgroundColor:'#fff',
        borderRadius:25,
        elevation:10,
        zIndex:99,
        height:100,
        width:100,
        overflow:'hidden',
        position:'absolute',

    },
    icon:{
       fontSize:20,
       color:colors.black
    },
    top:{
         top:((height-((widthOffset*2)*3))/2)-8, 
         left:width/2,
         transform: [{ translateX: -widthOffset }]
    },
    bottom:{
         top:(((height-((widthOffset*2)))/2) +widthOffset*2)+8,
         left:width/2,
         transform: [{ translateX: -widthOffset }]
    },
    left:{
        top:(height/2)-tabBarHeight,
        left:(width/2)-8-(widthOffset*2),
        transform: [{ translateX: -widthOffset }],
    },
    right:{
        top:(height/2)-tabBarHeight,
        left:(width/2)+8+(widthOffset*2),
        transform: [{ translateX: -widthOffset }],
    },
 });

export default Content
