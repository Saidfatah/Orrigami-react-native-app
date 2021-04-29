import React, { useState,useContext,useEffect } from 'react'
import {StyleSheet, View, Text, Dimensions as d ,Image,StatusBar,TouchableOpacity} from 'react-native'
import Gradiant from '../wrrapersAndElems/GradiantWrraper'
import {AuthContext} from '../../Context/AuthProvider'
import ImagePickerModal from './ImagePicker'
import StudenNavigator from './Student/StudenNavigator'
import noImage from '../../images/noImage.jpg'
import TutorInfo from './tutor/TutorInfo'
import TutorBody from './tutor/TutorBody'

const  Profil=({navigation})=>{
    const {user} = useContext(AuthContext)
    const [modalVisible, setmodalVisible] = useState(false)
    const [userImageRender, setuserImageRender] = useState(undefined)

    useEffect(() => {
        console.log('profile')
        console.log(user.image)
           if(user.image != 'no image')setuserImageRender(user.image)
    }, [user])

    const UserInfo =()=>{
        const ProfileImage=()=>{
            return <View style={{marginRight:16}}>
               <TouchableOpacity onPress={()=>setmodalVisible(true)} >
                   <View style={styles.imageContainer} >
                         <Image  source={userImageRender != undefined
                            ?{uri:userImageRender}
                            :noImage}  
                            style={styles.image} />
                   </View>
               </TouchableOpacity>
           </View>
        }
        const Info =()=>{
            if(user.type =="STUDENT")
                 return <View style={styles.info}>
                 <Text style={{color:'#fff',fontSize:20}}>{user.firstName +' '+ user.lastName}</Text>
                 <Text style={{color:"#fff",fontSize:16}}>Biology student</Text>
                 </View>
            else if(user.type == "TUTOR") 
                 return <TutorInfo />
            return <View />
        }

        return <Gradiant style={styles.userInfo} s={{x:2,y:1}} e={{x:0,y:0}} >
                 <ProfileImage/>
                 <Info/>
          </Gradiant>
    }
    const ProfileBody=()=>{
        if(user.type =="STUDENT")
             return <StudenNavigator />
        else  if(user.type =="TUTOR") 
             return <TutorBody />
    }
    return (
        <View  style={styles.container}>
             <ImagePickerModal  modalVisible={modalVisible} setuserImageRender={setuserImageRender} setmodalVisible={setmodalVisible}/>
             <UserInfo />
             <ProfileBody />
        </View>
    )
}
const sh = d.get('screen').height;
const wh = d.get('window').height;
const nh = sh - wh + StatusBar.currentHeight;
var styles = StyleSheet.create({
    container:{
        width:'100%',
        height:wh-nh,
        backgroundColor:'white',
     },
    info:{
        display:'flex',
        flex:2,
        justifyContent:'center',
        backgroundColor:'transparent'
    },
    image:{
      height:100,
      borderRadius:50,
      width:100,
    },
    imageContainer:{
      height:104,
      borderRadius:50,
      width:104,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'#fff',
      borderWidth:4,
      elevation:10,
    },
    userInfo:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       width:500,
       padding:16
    },
 });
export default Profil
