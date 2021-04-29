import React,{useState,useContext} from 'react'
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import DatePicker from '@react-native-community/datetimepicker'
import FA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../../styles/variables'
import {setPlan,creatChat,setNotif,checkChatExists,addMessage} from '../../../../FireBase/firebase'
import Modal from '../../../wrrapersAndElems/ModalWrraper'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import {AuthContext} from '../../../../Context/AuthProvider'


String.prototype.toHHMMSS =()=> {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

const Plan=(props)=> {
    const {user}= useContext(AuthContext)
    const [showFrom, setshowFrom] = useState(false)
    const [showToo, setshowToo] = useState(false)
    const [planObj, setplanObj] = useState({
         from:new Date(),
         to:new Date(),
         date:new Date('9/18/2019'),
         title:'Arab Lesson ',
         clientId :'3ZBcB5tkuqPtVJlMUhdMueUmxf82',
    })
    const [fromIsSet, setfromIsSet] = useState(false)
    const [toIsSet, settoIsSet] = useState(false)
    const [planType, setplanType] = useState(true)
    const {modalVisible,setmodalVisible,assignment}= props
   


    const Time =()=>{
        const onChangeHnadler = (event, selectedDate,when) => {
            const currentDate = selectedDate || ( when =='from' ?planObj.from:planObj.to);
            setshowToo(false);
            setshowFrom(false);
            if(event.type === 'set') {
                setplanObj({...planObj,[when]:currentDate}); 
                if(when == 'to') settoIsSet(true)
                if(when == 'from') setfromIsSet(true)
            };
            
        };  
        const From =()=>{
            const props={
                 testID:"dateTimePicker",
                 style:{...styles.Input,justifyContent:'center'} ,
                 value:planObj.from,
                 collapsable:true,
                 mode:"time",
                 placeholder:"Date of birth",
                 dateFormat:"dayofweek day month",
                 minimumDate:new Date(1950, 0, 1) ,
                 maximumDate:new Date(2300, 10, 20) ,
                 is24Hour:true,
                 onChange:(event, selectedDate)=>onChangeHnadler(event, selectedDate,'from')
            }
            return <View >
                   <TouchableOpacity onPress={()=>setshowFrom(true)} >
                    <View style={{...styles.btn,flexDirection:'row',marginRight:8}}>
                      <Text style={{color:colors.black}} >
                          {fromIsSet
                          ?new Date(planObj.from).toISOString().substr(11, 5)
                          : '00:00'}
                           </Text>
                    </View>
                    </TouchableOpacity> 
                    {showFrom && <DatePicker {...props} />}
            </View>
        }
        const To =()=>{
            const props={
                 testID:"dateTimePicker",
                 style:{...styles.Input,justifyContent:'center'} ,
                 value:planObj.from,
                 collapsable:true,
                 mode:"time",
                 placeholder:"Date of birth",
                 dateFormat:"dayofweek day month",
                 minimumDate:new Date(1950, 0, 1) ,
                 maximumDate:new Date(2300, 10, 20) ,
                 is24Hour:true,
                 onChange:(event, selectedDate)=>onChangeHnadler(event, selectedDate,'to')
            }
            return <View>
                   <TouchableOpacity onPress={()=>setshowToo(true)} >
                         <View style={{...styles.btn,flexDirection:'row',marginRight:8}}>
                              <Text style={{color:colors.black}} >
                                  {toIsSet
                                   ?new Date(planObj.to).toISOString().substr(11, 5) 
                                   : '00:00'
                                   } 
                              </Text>
                         </View>
                    </TouchableOpacity> 
                    {showToo && <DatePicker {...props} />}
            </View>
        }

        return <View style={styles.time}>
           <From />
           <To /> 
        </View>
    }

    const SchedualeButton =()=>{
        const Sechdul=async()=>{
            //if there is a chat alredy with this user don't craete a new chat 
            const msg ='Bonjour '+ assignment.client.name+ ' vous etes connecter avec votre nouveau Instructeur'
            const tFrom = new Date(planObj.from).toISOString().substr(11, 5)
            const tto = new Date(planObj.to).toISOString().substr(11, 5)
            const planObjUpload= {
              time:{
                  date:planObj.date,
                  start:tFrom,
                  end:tto,
              },
              topic : assignment.topic,
              student_name:assignment.client.name,
              student_id:assignment.student_id,
              tutor_id:user.id,
              isGroup:planType,
              tutor:{
                  name:user.userName,
                  image:user.image
              }
            }  

            try {
                 const senderObj = {
                     id:user.id,
                     name:user.userName,
                     image:user.image
                 }
                 const recieverObj = {
                     id:assignment.student_id,
                     name:assignment.client.name,
                     image:assignment.client.image
                 }

                 //check if chat exists 
                 let updateAexistingChatPromise ;
                 let ChatPromise ;
                 let updatedChat= false ;
                 const checkChatExistsPromise = await checkChatExists(senderObj.id,recieverObj.id)
                 if(checkChatExistsPromise.docs[0] != undefined)
                 {
                     const chatId = checkChatExistsPromise.docs[0].id
                     updateAexistingChatPromise = await addMessage(chatId,user.userName,msg,user.id,user.image)
                     if(updateAexistingChatPromise.id == undefined)new Error('CHAT_FAILED')
                     updatedChat=true;
                 }else
                 {
                    ChatPromise =await creatChat(senderObj,recieverObj,msg)
                    if(ChatPromise.id == undefined)new Error('CHAT_FAILED')
                 }
                
                 const PlanningPromise =await setPlan({...planObjUpload,chatId:ChatPromise.id},user.id)
                 if(PlanningPromise.id == undefined) throw new Error('PLAN_FAILED')

                 const notif = {
                     action:{
                         params:{
                             tutor:{
                                 name:user.userName,
                                 id:user.id,
                                 image:user.image,
                             },
                             title:assignment.topic,
                             planning:{
                                 id:PlanningPromise.id,
                                 start:tFrom,
                                 end:tto,
                                 date:planObj.date
                             },
                             chatId:updatedChat?checkChatExistsPromise.docs[0].id:ChatPromise.id,

                        },
                        route:'course',
                     },
                     owner_uid:assignment.student_id,
                     title:"Your reservation is scheduled with tutor " + user .userName,
                 }
                 const notifPromise =await setNotif(notif)
                 if(notifPromise.id == undefined) throw new Error('NOTIF_FAILED')
                 setmodalVisible(false)
                 console.log('added planning and notif and created chat ')
                } catch (error) {
                const errMsg = error.message
                if(errMsg=='PLAN_FAILED') console.log('PLAN_FAILED')
                if(errMsg=='CHAT_FAILED') console.log('CHAT_FAILED')
                if(errMsg=='NOTIF_FAILED') console.log('NOTIF_FAILED')
                console.log(errMsg)
            }

        }

        const clientName= assignment.client.name || 'client'
        return  <TouchableOpacity onPress={()=>Sechdul()} >
             <Gradiant  style={{...styles.btn,flexDirection:'row',marginRight:8}}>
                 <FA name='calendar' size={20} color='#fff'/>
                 <Text style={{color:'#fff',marginLeft:16}} >
                      {"Schedule plan with" +clientName} 
                 </Text>
             </Gradiant>
        </TouchableOpacity> 
    }

    const PlanType = ()=>{
        return <View style={styles.planTypes}>
            <TouchableOpacity onPress={()=>setplanType(true)}>
                        <View style={styles.planType}>
                            <Text> Group </Text>
                            <Icon 
                                 name={planType
                                    ?"checkmark-circle"
                                    :"checkmark-circle-outline"} 
                                 size={20} 
                                 color={colors.colors[2]} />
                        </View>
             </TouchableOpacity>
            <TouchableOpacity onPress={()=>setplanType(false)}>
                        <View style={styles.planType}>
                            <Text> Individual </Text>
                            <Icon 
                                 name={!planType
                                    ?"checkmark-circle"
                                    :"checkmark-circle-outline"} 
                                 size={20} 
                                 color={colors.colors[2]} />
                        </View>
             </TouchableOpacity>
        </View>
    }




    const mprops = {
        modalVisible:modalVisible,
        setmodalVisible:setmodalVisible,
        height:400,
        title:"New Session"
    }
    return (
        <Modal {...mprops} >
         <View style={styles.plan} >
             <Text style={styles.planTitle} >{assignment.topic}</Text>
             <Time />
             <PlanType />
             <SchedualeButton />
         </View>
        </Modal>
    )
}

var styles = StyleSheet.create({
    time:{
        padding:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    planType:{
        backgroundColor:'#fff',
        padding:8,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        width:100,
        margin:2,
    },
    planTypes:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
    },
    planTitle:{
        textAlign:'center',
        fontSize:18,
        marginBottom:16
    },
    plan:{
        justifyContent:'center',
        width:'100%',
        height:'100%'
    },
    btn:{
        padding:16,
        elevation:5,
        borderRadius:12,
        marginBottom:16,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    text:{
        fontSize:25,
        color:'#fff',
        textAlign:'center',
        marginBottom:16
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

export default Plan
