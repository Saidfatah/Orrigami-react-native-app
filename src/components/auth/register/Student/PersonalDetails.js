import React,{useContext,useState} from 'react'
import {StyleSheet, View,Dimensions,StatusBar,Text,TextInput,TouchableNativeFeedback} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'
import {colors} from '../../../../styles/variables'
import {RegisterContext} from '../../../../Context/RgisterContext'
import Icon from 'react-native-vector-icons/Entypo';
import FA from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import Loading from '../../../wrrapersAndElems/Loading'

const wheight = Dimensions.get('window').height
const wwidth = Dimensions.get('window').width
const stautsHeihgt = StatusBar.currentHeight


const PersonalDetails=({navigation})=> {
     const {userRegisternfo,handelChange,Register}=useContext(RegisterContext)
     const { address, birth, phone} = userRegisternfo
     const [show, setshow] = useState(false)
     const [date, setDate] = useState(new Date(1598051730000));
     const [isRegestring, setisRegestring] = useState(false)


     const register=()=>{ 
      setisRegestring(true) 
       Register()
       .then((docRef)=>{
         setisRegestring(false) 
         navigation.navigate('Plan')
        })  
       .catch((error)=>{
         setisRegestring(false) 
         console.error("Error adding document: ", error); 
        });
      }
     const prevStep=()=>{
      navigation.navigate('UserDetails')
     }
     

   
     const DatePickerButton =()=>{
      const onChangeHnadler = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setshow(false)
        if (event.type === 'dismissed') {
          handelChange('birth')(new Date(0))
        } 
        else if(event.type === 'set') {
          handelChange('birth')(currentDate)
        }
        
      };
      const pickerProps = {
        testID:"dateTimePicker",
        style:{...styles.Input,justifyContent:'center'},
        value:birth,
        collapsable:true,
        mode:"date",
        placeholder:"Date of birth",
        dateFormat:"dayofweek day month",
        minimumDate:new Date(1950, 0, 1),
        maximumDate:new Date(2300, 10, 20),
        is24Hour:true,
        onChange:onChangeHnadler,
      }
  
      return <View style={{width:'100%',marginBottom:8}}>
             <TouchableNativeFeedback onPress={()=>setshow(true)} >
              <View style={{...styles.login,flexDirection:'row',marginRight:8}}>
                 <FA name='calendar' size={20} color={colors.black}/>
                <Text style={{color:colors.black}} >{new Date(birth).toLocaleDateString("en-US")||'birth day'}</Text>
              </View>
              </TouchableNativeFeedback> 
              {show && <DatePicker {...pickerProps} />}
      </View>
     }
     const Buttons = ()=>{
      return  <View style={{flexDirection:'row',alignItems:'center',width:'100%'}} >
      <TouchableNativeFeedback onPress={e=>prevStep()} >
      <View style={{...styles.login,flexDirection:'row',marginRight:8}}>
         <Icon name='chevron-left' size={20} color={colors.black}/>
        <Text style={{color:colors.black}} >Previous</Text>
      </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={e=>register()} >
      <View style={{...styles.login,flexDirection:'row'}}>
        <Text style={{color:colors.black}} >Inscription</Text>
        {isRegestring
        ?<Loading height={25} />
        :<FA name='check' size={20} color={colors.black}/>
       }
      </View>
      </TouchableNativeFeedback>
     </View>
     }

    return (
      <KeyboardAwareScrollView>
          <Gradiant  style={styles.gradiant}>
             <Text style={styles.title} >Personal Details</Text>
             <View style={{width:'100%'}}>
             <TextInput style={styles.Input}   
                      placeholder={"phone number"}   
                      defaultValue={phone} 
                      keyboardType="phone-pad"
                      onChangeText={text=>handelChange('phone')(text)} 
              />
             <TextInput style={styles.Input}   
                      placeholder={"Address"}   
                      defaultValue={address} 
                      onChangeText={text=>handelChange('addres')(text)} 
              />
             <DatePickerButton />
             </View>
             <Buttons />
          </Gradiant>
      </KeyboardAwareScrollView>
    )
}


var styles = StyleSheet.create({
  gradiant:{
    height:wheight-50-stautsHeihgt,
    justifyContent:'center',
    padding:16
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
  loginGradiant:{
     width:'100%',
     borderTopLeftRadius:25,
     borderTopRightRadius:25,
     padding:16
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
  FV:{
    height:wheight-50,
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
  }
});

export default PersonalDetails

