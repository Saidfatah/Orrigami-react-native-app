import React from 'react'
import {setNotif} from '../../../FireBase/firebase'
import {StyleSheet,View,Text,Linking,FlatList ,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import { colors } from '../../../styles/variables'
import MTIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Modal from '../../wrrapersAndElems/ModalWrraper'

const ContactModal=({clientPhone,tutors,modalVisible, setmodalVisible,selectedReservation})=>{ 
    
    const call=phone=>{
         Linking.openURL(`tel:${phone}`) 
    }
    const assign=(id,tutorname)=>{
         let action
         if(selectedReservation.isIndividual)
          action={
             params:{
                 modalVisible:true,
                 assignment: {
                     topic:selectedReservation.topic,
                     student_id:selectedReservation.client_id,
                     client:{
                        id:selectedReservation.client_id,
                        name:selectedReservation.full_name,
                        image:selectedReservation.client.image
                     }
                 }
             },
             route:'plans'
         }
         else
          action={
             params:{
                 modalVisible:true,
                 groupRequest: {
                     group:{
                         title :  selectedReservation.group.groupName,
                         id:      selectedReservation.group.id,
                     },
                     student:{
                        id:selectedReservation.client_id,
                        name:selectedReservation.client.full_name,
                     }
                 }
             },
             route:'groups'
         }
         setNotif({
            action,
            owner_uid:id,
            checked:false,
            title:'new assignment fo your ' + tutorname,
         }).then(r=>console.log('added notif'))
         .catch(err=>console.log(err))
    }

    const Tutors=()=>{
        let resevationTutors ;
        if(tutors[0]== undefined)return <View />
        if(selectedReservation.isIndividual)
         resevationTutors= [...tutors].filter(t=>t.skills.indexOf(selectedReservation.subject.toLowerCase()) != -1 )    
        
        const Tutor =({item})=>{
            const {phone,name,id}=item
          return <View style={{flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'space-between'}}>
                 <TouchableOpacity onPress={()=>{call(phone)}}>
                        <View style={{...styles.btn,flex:1}}>
                             <MTIcon name="call" size={25} color={colors.green} />
                             <Text style={{color:colors.black}}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{assign(id,name)}}>
                        <View style={{...styles.btn,flex:1}}>
                             <Text style={{color:colors.black}}>assign {name}</Text>
                        </View>
                 </TouchableOpacity>
          </View> 
        }

        return <View style={{...styles.tutors,...styles.secton}}>
                 <Text>{selectedReservation.subject} tutors</Text>
                 {selectedReservation.isIndividual
                 ?<FlatList 
                  data={resevationTutors}
                  style={{height:200}}
                  renderItem={Tutor}
                  keyExtractor={(item,index)=>index.toString()}
                 />:
                 <Tutor item={selectedReservation.group.tutor}/>
                }
          </View>
    }  
    const Actions = ()=>{
         return <View style={{...styles.actions,...styles.secton}}>
             <TouchableOpacity onPress={()=>{call(clientPhone)}}>
                 <View style={{...styles.btn,width:150}}>
                      <MTIcon name="call" size={25} color={colors.green} />
                      <Text style={{color:colors.black}}>Client</Text>
                 </View>
             </TouchableOpacity>
             {
                 selectedReservation.stage !='paid'?<TouchableOpacity onPress={()=>{call(clientPhone)}}>
                     <View style={{...styles.btn,width:150}}>
                          <Icon name="check-square-o" size={25} color={colors.green} />
                          <Text style={{color:colors.black}}>Mark as paied</Text>
                     </View>
                 </TouchableOpacity>
                 :<View />
             }
         </View>
    }
    const Info = ()=>{
        return <View style={{...styles.info,...styles.secton}}>
              <View style={styles.FRB} >
                   <Text style={{color:colors.grey}}>paid :  </Text>
                   {
                       selectedReservation.stage !="paid"?
                       <Text style={{color:colors.red}}>not yet </Text>
                       :<Text style={{color:colors.green}}>paid</Text>
                   }
              </View>
              <View style={styles.FRB} >
                  <Text style={{color:colors.grey}}>scheduled :</Text>
                   {
                       !selectedReservation.scheduled ?
                       <Text style={{color:colors.red}}> waiting for tutor  </Text>
                       :   <Text style={{color:colors.red}}> waiting for tutor  </Text>
                   }
              </View>
        </View>
    }


    return <Modal {...{ title:"Reservation",modalVisible,setmodalVisible,height:'100%'}} >
         <View style={{padding:8}}>
         <Actions />
         <Tutors />
         {selectedReservation.isIndividual==true ?<Info/>:<View/>}
         </View>
    </Modal>
}

const styles =StyleSheet.create({
    secton:{
        elevation:5,
        backgroundColor:'#fff',
        borderRadius:25,
        padding:16
    },
    actions:{
        height:120,
    },
    info:{
        height:100,
    },
    tutors:{
        height:200,
        marginVertical:16,
    },

    FRB:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    modalContainer:{
        justifyContent:'center',
        height:'100%',
        padding:16,
        alignItems:'center'
    },
    modal:{
        width:250,
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:25,
        padding:16,
    },
    btn:{
        padding:8,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:12,
        alignItems:'center',
        marginRight:8,
        elevation:5,
        marginBottom:8
    },
})

export default ContactModal 