import React,{useState} from 'react'
import {StyleSheet, View,Image,Dimensions,Text,TextInput,TouchableNativeFeedback} from 'react-native'
import logo from '../../images/logo.png'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../../styles/variables'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import Loading from '../wrrapersAndElems/Loading'
import Gradiant from '../wrrapersAndElems/GradiantWrraper'
import auth from '@react-native-firebase/auth';

const wheight = Dimensions.get('window').height
const wwidth = Dimensions.get('window').width


const Loggin=({navigation})=>{
    const [email,setEmail]=useState('rust@rust.com')
    const [password,setPassword]=useState('123456')
    const [logginBtn, setlogginBtn] = useState(false)
    const [ERR, setERR] = useState('')


    const validateEmail = () => {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return reg.test(email) 
    }

    const login =async ()=>{
          if(email=="" || password =="") return setERR('Please insert email and password')
          if(!validateEmail())return setERR('insert a valid email !')
          setlogginBtn(true)
          try {
                    const logginPromise = await auth().signInWithEmailAndPassword(email, password)  
                    if(logginPromise){
                          setlogginBtn(false)
                          return navigation.navigate('board')
                    }  
                    throw new Error('WRONG_EMAIL')
                    
          } catch (error) {
                    setlogginBtn(false);
                    if(error.message =='WRONG_EMAIL' || error.message.indexOf('auth/wrong-password') != -1 ) 
                      setERR('wrong email or password')
                    console.log(error.message)
          }
     }

    const Logo=()=>{
       return (
       <View style={styles.FV} >
           <LinearGradient start={{x:0, y:1}} 
                       end={{x: 0.75, y: .25}} 
                       colors={colors.colors} 
                       style={styles.linearGradient} >
            <Image style={styles.logo} source={logo} />
           </LinearGradient>
           <Text style={styles.logoText}>ORIIGAMI</Text>
    </View>
    )}
    const ERRR=()=>{
      if(ERR!='')
       return <View style={styles.err} >
              <Text style={{color:'#fff',textAlign:'center'}}>{ERR}</Text>
              <Icon name="error" size={25} color="#fff" />
       </View>
       return <View/>
   }
 

    return(
     <KeyboardAwareScrollView contentContainerStyle={styles.FC}  style={{height:'100%'}} >
          <Logo />
          <Gradiant  style={styles.loginGradiant }>
              <ERRR />
              <TextInput 
                   style={styles.Input} 
                   placeholder="User name"   
                   onChangeText ={text =>setEmail(text)} 
                   value={email} 
               />
              <TextInput 
                   style={styles.Input}  
                   placeholder="password" 
                   secureTextEntry={true} 
                   onChangeText={text =>setPassword(text)} 
                   value={password} 
                   />
              <TouchableNativeFeedback disabled={logginBtn} onPress={login}>
                  <View style={{...styles.login,padding:logginBtn?0:16}}>
                   {  logginBtn
                      ? <Loading height={50} />
                      :<Text style={{color:colors.green,fontWeight:'bold'}}>Login</Text> 
                   }
                  </View>
              </TouchableNativeFeedback>                 
             
              <View style={styles.question}>
                  <TouchableNativeFeedback onPress={()=>{navigation.navigate('typeRegister')}}>
                     <Text style={{color:'#fff',padding:16,marginBottom:16}}> you don't have an account ? Register</Text>
                  </TouchableNativeFeedback>
              </View>
        </Gradiant>
     </KeyboardAwareScrollView>
    )
    
 }


 var styles = StyleSheet.create({
    err:{
       width:'100%',
       position:'absolute',
       flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between',
       top:-50,
       zIndex:99,
       left:'50%',
       borderRadius:12,
       padding:8,
       transform:[{translateX:-((wwidth/2)-32)}],
       backgroundColor:colors.red
    },
    loginGradiant:{
       width:'100%',
       borderTopLeftRadius:25,
       borderTopRightRadius:25,
       padding:16,
    },
    login:{
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
    question:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      width:'100%'
    },
    logo:{

      height:100,
      width:100,
    },
    logoText:{
      textAlign:'center',
      fontSize:24,
      color:colors.grey
    },    
    FV:{
      display:'flex',
      flex:1,
      backgroundColor:'#fff',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
    FC:{
      flexDirection:'column',
      justifyContent:'space-between',
      height:wheight,
      backgroundColor:'#fff',
    },
    linearGradient:{
       width:100,
       overflow:"hidden",
       borderRadius:20,
    },
    hunder:{width:'100%',height:25},
    f1:{flex:1}
 });
 export default Loggin