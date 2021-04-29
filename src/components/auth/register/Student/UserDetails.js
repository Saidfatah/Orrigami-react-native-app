import React,{useState,useRef,useContext} from 'react'
import {StyleSheet, View,Dimensions,StatusBar,Text,TextInput,TouchableNativeFeedback} from 'react-native'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import {RegisterContext} from '../../../../Context/RgisterContext'
import {colors} from '../../../../styles/variables'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import {checkUserName,checkEmail} from '../../../../FireBase/firebase'
import Loading from '../../../wrrapersAndElems/Loading'

const wheight = Dimensions.get('window').height
const wwidth = Dimensions.get('window').width
const stautsHeihgt = StatusBar.currentHeight

const UserDetails=({navigation})=> {
   const {userRegisternfo,handelChange}=useContext(RegisterContext)
   const { firstName,lastName, email, password,userName} = userRegisternfo

   const [confimrPassword,setconfimrPassword]=useState('')
   const [emailError,setEmailError]=useState(false)
   const [emErr,setemErr]=useState(false)
   const [emailExists,setemailExists]=useState(false)

   const [fnErr,setfnErr]=useState(false)
   const [lnErr,setlnErr]=useState(false)
   const [passErr,setpassErr]=useState(false)
   const [usernameErr,setusernameErr]=useState(false)
   const [userNameReqErr,setuserNameReqErr]=useState(false)
   const [passMatchErr,setpassMatchErr]=useState(false)
   const [isProccesing, setisProccesing] = useState(false)
   const [alreadyChechekdEmail, setalreadyChechekdEmail] = useState(false)
   const [alreadyCheckedUsername, setalreadyCheckedUsername] = useState(false)

   const reqField = 'required Field'
   const emailMsg = "invalid email, please insert a valid email"
   const usernameMsg = "User name is already in use "
   const passMatchMsg = "password doasn't match !"
   const emailExistsMsg = "Email is used already ! "
   
   const validateEmail = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(email) 
   }
   const resetValidation = ()=>{
    setEmailError(false)
    setlnErr(false)
    setfnErr(false)
    setemErr(false)
    setpassMatchErr(false)
    setemailExists(false)
    setpassErr(false)
    setusernameErr(false)
    setuserNameReqErr(false)
   }
   const onNext=async e=>{
       if(firstName =='' || lastName =='' || email == '' || password =='' || userName == '')
       {
          if(firstName =='')setfnErr(true)
          if(lastName =='')setlnErr(true)
          if(userName =='')setuserNameReqErr(true)
          if(email =='')setemErr(true)       
          if(password =='')setpassErr(true)
          else if(password != confimrPassword) setpassMatchErr(true) 
       }else {
          if(!validateEmail())return setEmailError(true)
          setisProccesing(true)
          try {
              if(!alreadyCheckedUsername){
                 const  usernameresult  =await checkUserName(userName)
                 if(usernameresult== true  ){
                  setusernameErr(true)   
                  handelChange('userName')('')
                  return setisProccesing(false)
                 }
              }
              if(!alreadyChechekdEmail)
               {
                  const  emaulresult  =await checkEmail(email)
                  if(emaulresult[0] != undefined){
                    console.log(emaulresult[0])
                    handelChange('email')('')
                    setisProccesing(false)
                    return  setemailExists(true)
                  }
              }
          } catch (error) {console.log(error) }
     
          if(!alreadyChechekdEmail) setalreadyChechekdEmail(true)
          if(!alreadyCheckedUsername) setalreadyCheckedUsername(true)

          setisProccesing(false)
          navigation.navigate('PersonalDetails')
       }
    }

    return (
      <KeyboardAwareScrollView contentContainerStyle={{height:wheight}} showsVerticalScrollIndicator={false}>
      <Gradiant style={styles.gradiant}>
             <Text style={styles.title} >User Details</Text>
             <TextInput 
                     style={{...styles.Input,
                      backgroundColor:userNameReqErr||usernameErr?'red':'#fff'
                     }}   
                     placeholder={usernameErr?usernameMsg:"User name"}
                     value={userName}
                     onChangeText={text=>{
                       handelChange('userName')(text)
                       setalreadyCheckedUsername(false)
                      }} 
                     onFocus={e=>resetValidation()}
                     /> 
             <TextInput 
                     style={{...styles.Input,backgroundColor:fnErr?'red':'#fff'}}   
                     placeholder="First name" 
                     value={firstName}
                     onChangeText={text=>handelChange('firstName')(text)} 
                     onFocus={e=>resetValidation()}
                     /> 
             <TextInput 
                     style={{...styles.Input,backgroundColor:lnErr?'red':'#fff'}}
                     placeholder="Last name"  
                     value={lastName} 
                     onChangeText={text=>handelChange('lastName')(text)} 
                     onFocus={e=>resetValidation()}
                     />
             <TextInput 
                     style={{...styles.Input,
                      backgroundColor:emErr||emailExists||emailError?'red':'#fff'
                     }}  
                     placeholder={emailError?emailMsg:(emailExists?emailExistsMsg:"Email")}
                     value={email} 
                     onChangeText={text=>{
                       handelChange('email')(text)
                       validateEmail()
                       setalreadyCheckedUsername(false)
                     }} 
                   
                     onFocus={e=>resetValidation()}
                     />
             <TextInput 
                     style={{...styles.Input,backgroundColor:passErr?'red':'#fff'}} 
                     placeholder="password"   
                     secureTextEntry={true}
                     value={password}
                     onChangeText={text=>handelChange('password')(text)}
                     onFocus={e=>resetValidation()}
              />
             <TextInput
                     style={{...styles.Input,backgroundColor:passMatchErr ?'red':'#fff'}}  
                     placeholder={passMatchErr?passMatchMsg:"Confirm Password"} 
                     value={confimrPassword}
                     secureTextEntry={true}
                     onChangeText={text=>setconfimrPassword(text)}
                     onFocus={e=>resetValidation()}
             />
             <TouchableNativeFeedback onPress={e=>onNext()} >
                  <View style={{...styles.login,display:'flex',flexDirection:'row'}}>
                   { !isProccesing
                   ?<Text style={{color:colors.black}} >Next</Text>
                   :<Loading height={25} />
                   }
                  </View>
             </TouchableNativeFeedback>
        </Gradiant>
      </KeyboardAwareScrollView>
    )
}

var styles = StyleSheet.create({
    title:{color:'#fff',fontSize:25,textAlign:'center',marginBottom:16},
    gradiant:{
    justifyContent:'center',
    height:'100%',
    padding:16
    },
    err:{
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      borderRadius:12,
      padding:8,
      marginBottom:8,
      color:'#fff',
      backgroundColor:colors.red
   },

    login:{
      padding:16,
      width:'100%',
      elevation:5,
      borderRadius:12,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#fff'
  
    },
    Input:{
      padding:8 ,
      color:colors.black,
      backgroundColor:'#fff',
      width:'100%',
      height:50,
      borderRadius:12,
      marginBottom:8,
    },
     
    FV:{
      height:wheight-50,
      backgroundColor:'#fff',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },

  });

export default UserDetails
