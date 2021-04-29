import React,{useState,useEffect} from 'react'
import {StyleSheet,TouchableNativeFeedback,TextInput,View,Text,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FA from 'react-native-vector-icons/FontAwesome';
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import {colors} from '../../../styles/variables'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import {setUser,checkUserName} from '../../../FireBase/firebase'
import Loading from '../../wrrapersAndElems/Loading'


const wwidth = Dimensions.get('window').width

const RegisterTutor=({navigation})=> {
     const [skills, setskills] = useState([
        {title:'Francais',category:'Language'},
        {title:'Anglais',category:'Language'},
        {title:'Arab',category:'Language'},
        {title:'Francais',category:'Language'},
        {title:'Physic',category:'science'},
        {title:'Biology',category:'science'},
        {title:'math',category:'science'},
        {title:'Java',category:'computer'},
    ])
     const [check, setcheck] = useState([])
     const [tutor, setTtutor] = useState({
        firstName:'hamdil',
        lastName:'hamdil',
        userName:'hamida',
        email:'iqbal@hotmail.com',
        type:'TUTOR',
        phone:'0684575214',
        password:'123456',
        addres:'some random addres maybe bolvia lol',
        skills:[],
     })
     const [regstiringBtn, setregstiringBtn] = useState(false)
     
     const [requiredFields, setrequiredFields] = useState({
      firstName:false,
      lastName:false,
      userName:false,
      email:false,
      password:false,
      phone:false,
      skills:false,
     })
     const [userNameERR, setuserNameERR] = useState(false)
     const [emailValid, setemailValid] = useState(false)
     const [emailUsed, setemailUsed] = useState(false)
     const [weakPass, setweakPass] = useState(false)
     const [somethingWentWrong, setsomethingWentWrong] = useState(false)
     
     const WRONG = 'somthing went wrong try again ! '
     const REQUIRED = 'required Field'
     const EMAIL_INVALID = "invalid email, please insert a valid email"
     const USERNAME_USED = "User name is already in use "
     const EMAIL_USED = "Email is used already ! "
     const PASS_WEAK = "weak password "

     useEffect(()=>{
         if(check.length < 1) setcheck(skills.map(s=>false))
     },[tutor])
     
  
     const resetValidation = ()=>{
       setemailValid(false);
       setuserNameERR(false);
       setemailUsed(false);
       setweakPass(false);
       const reqvalues= {...requiredFields}
       const resetedObj =Object.keys(reqvalues).forEach(v => reqvalues[v] = false)
       setrequiredFields({...resetedObj})

     }

     const validateFields=()=>{
           const reg =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
           const validateEmail = ()=>reg.test(tutor.email) 
           let hasErrors = false 

           const errorsObj ={}
           for (const key in tutor) {
               // if(key == "skills") break ;
               if(key != "skills"){
                  errorsObj[key]= tutor[key]==''
                  if(tutor[key] == '')hasErrors=true;

               }
           }
           errorsObj['skills']= false
           setrequiredFields({...errorsObj})

           if(tutor.skills.length <1){
                 setrequiredFields({...errorsObj,skills:true})
                hasErrors=true
           }
           if(tutor.email != '' && !validateEmail()){
                 setemailValid(true)
                 hasErrors=true
          }

          return hasErrors
     } 

     const Register=async ()=>{
         if(validateFields()) return ;

         const {email,password,userName}= tutor
         delete tutor.password;

         resetValidation();
         setregstiringBtn(true);

         try {
            const userNameCheck =await checkUserName(userName)
            if(userNameCheck == true)
                throw new Error('USERNAME_USED')
            
            //is this reachable if the error is threwn ???
            const settingUser=await setUser(email,password,tutor)
            if(settingUser.id == undefined)
               throw new Error('REGISTER_FAILED')
            if(settingUser) navigation.navigate('board')
         } catch (error) {
            setregstiringBtn(false);
            if(error.message == 'REGISTER_FAILED')
               return setsomethingWentWrong(true)
            if(error.message == 'USERNAME_USED')
               return setuserNameERR(true);
            if(error.message.indexOf('auth/weak-password') != -1)
               return  setweakPass(true)
            if(error.message.indexOf('auth/email-already-in-use') != -1)
               return  setemailUsed(true)
             
              console.log(error.message)
         }
 
     }
     const handelChange=(input,v)=>setTtutor({...tutor,[input]:v})
     const choseSubject =(i)=>{
        resetValidation()
        const checked = [...check]
        checked[i]=!checked[i],
        setcheck([...checked])
        const prevSkills =[...tutor.skills]
        const index = prevSkills.indexOf(skills[i].title)
        if(index != -1)prevSkills.splice(index,1)
        else prevSkills.push(skills[i].title)
        handelChange('skills',[...prevSkills])
     }
    

     const RegisterButton = ()=>{
         return <TouchableNativeFeedback onPress={e=>Register()} >
         <View style={{...styles.login,flexDirection:'row'}}>
           <Text style={{color:colors.black}} >Regsitrer L'instructeur</Text>
            {regstiringBtn
                      ? <Loading height={50} />
                      :<FA name='check' size={20} color={colors.black}/>
            }
         </View>
         </TouchableNativeFeedback>
     }
     const Skills = ()=>{
         return <View style={{backgroundColor:'#fff', borderRadius:25,paddingVertical:16,marginBottom:8}}>
             <Text style={{fontSize:20,paddingLeft:8}}>Skills :</Text>
             <View style={styles.skills}>
             {
                 skills.map((s,i)=>(
                 <TouchableNativeFeedback key={i} onPress={()=>{choseSubject(i)}}>
                   <View style={styles.subject}>
                       <Text> {s.title} </Text>
                       <Icon name={check[i]?"checkmark-circle":"checkmark-circle-outline"} size={20} color={colors.colors[2]} />
                   </View>
               </TouchableNativeFeedback>)
               )
             }
         </View>
         </View>
     }
     const ERR =({trigger,txt})=>{
        return <Text style={{...styles.ERR,display:trigger?'flex':'none'}}>
           {txt}
        </Text>
     } 

     return (
         <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
             <Gradiant>
             <ERR trigger={somethingWentWrong}  txt={WRONG}/>
               <TextInput 
                     style={styles.Input}   
                     placeholder={'nom'}   
                     value={tutor.firstName || ''}
                     onChangeText={text=>handelChange('firstName' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={requiredFields.firstName}  txt={REQUIRED}/>
               
               <TextInput 
                     style={styles.Input}   
                     placeholder={'Prenom'}   
                     value={tutor.lastName || ''}
                     onChangeText={text=>handelChange('lastName' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={requiredFields.lastName}  txt={REQUIRED}/>

               <TextInput 
                     style={{...styles.Input}}   
                     placeholder={"Email"}   
                     value={tutor.email || ''}
                     onChangeText={text=>handelChange('email' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={requiredFields.email}  txt={REQUIRED}/>
               <ERR trigger={emailValid} txt={EMAIL_INVALID}/>
               <ERR trigger={emailUsed} txt={EMAIL_USED}/>

               <TextInput 
                     style={styles.Input}   
                     placeholder={"User name"}   
                     value={tutor.userName || ''}
                     onChangeText={text=>handelChange('userName' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={userNameERR} txt={USERNAME_USED}/>
               <ERR trigger={requiredFields.userName}  txt={REQUIRED}/>

               <TextInput 
                     style={styles.Input}   
                     placeholder={"Mote De passe"}   
                     value={tutor.password || ''}
                     onChangeText={text=>handelChange('password' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={requiredFields.password}  txt={REQUIRED}/>
               <ERR trigger={weakPass}  txt={PASS_WEAK}/>

               <TextInput 
                     style={styles.Input}   
                     placeholder={"Phone number"}   
                     value={tutor.phone || ''}
                     keyboardType="phone-pad"
                     onChangeText={text=>handelChange('phone' ,text)} 
                     onFocus={e=>resetValidation()}
               />
               <ERR trigger={requiredFields.phone}  txt={REQUIRED}/>

               <Skills />
               <ERR trigger={requiredFields.skills}  txt={REQUIRED}/>

               <RegisterButton />
             </Gradiant>
         </KeyboardAwareScrollView>
     )
}

var styles = StyleSheet.create({
     ERR:{
        width:'100%',
        backgroundColor:colors.red,
        padding:8,
        textAlign:'center',
        color:'#fff',
        borderRadius:12,
        marginBottom:8,
      },
     skills:{
         flexDirection:"row",
         alignItems:'center',
         justifyContent:'center',
         alignContent:'flex-start',
         flexWrap:'wrap',
       },
     Title:{
        fontSize:25,
        textAlign:'center',
        color:'#fff',
     },
     icon:{
        fontSize:20,
        marginRight:16,
        color:colors.black
     },
     text:{
        fontSize:20,
        color:colors.black
     },
     btn:{
        width:'100%',
        backgroundColor:'#fff',
        padding:16,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
     subject:{
        backgroundColor:'#fff',
        padding:8,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        elevation:5,
        width:100,
        margin:2,
  
     },
     Title:{
          fontSize:25,
          textAlign:'center',
          color:'#fff',
     },
     icon:{
          fontSize:20,
          color:colors.black
     },
     text:{
          fontSize:15,
          color:colors.black
     },
     btn:{
          flex:1,
          backgroundColor:'#fff',
          padding:16,
          borderRadius:50,
          marginBottom:8,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
     },
     rc:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
     filterLabel:{color:colors.black,
        backgroundColor:'#fff',
        borderRadius:50,
        textAlign:'center',
        marginBottom:8,
        padding:4,
        paddingHorizontal:10
      },
      title:{color:'#fff',fontSize:25,textAlign:'center',marginBottom:16},
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

      login:{
        padding:16,
        flex:1,
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

 });
 

export default RegisterTutor
