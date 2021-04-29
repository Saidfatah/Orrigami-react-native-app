import React,{useState,useContext} from 'react'
import {StyleSheet,TouchableOpacity,TextInput,Text,Dimensions} from 'react-native'
import Modal from '../../wrrapersAndElems/ModalWrraper'
import {setGroup,creatGroupChat} from '../../../FireBase/firebase'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import CheckBoxGroup from '../../wrrapersAndElems/CheckBoxGroup'
import FA from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../../Context/AuthProvider'
import {colors} from '../../../styles/variables'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'


const NewGroup=({modalVisible, setmodalVisible})=> {
     const [list, setlist] = useState(['PACK1','PACK2','PACK3'])
     const [subjects, setsubjects] = useState([
        {title:'Francais',category:'Language'},
        {title:'Arab',category:'Language'},
        {title:'Francais',category:'Language'},
        {title:'Physic',category:'science'},
        {title:'Biology',category:'science'},
        {title:'math',category:'science'},
        {title:'Java',category:'computer'},
     ])
     const [subject, setsubject] = useState('')
     const [plan, setplan] = useState('PACK1')
     const {user} = useContext(AuthContext)
     const [title, settitle] = useState('group title')

     const createGroup =async ()=>{
        try {
            const tutor ={id:user.id,name:user.userName,image:user.image,phone:user.phone}
            const message = 'salut tous a notre group '
           
            const createGroupChatPromise =await creatGroupChat(tutor,title,message)
            if(createGroupChatPromise.id == undefined) throw new Error('CHAT_FAILED')
          
            const groupObj = {
                chat_room:createGroupChatPromise.id ,
                members:[],
                open:true,
                pack:plan,
                subject,
                title,
                tutors:[
                    {
                        name:user.userName,
                        id:user.id
                    }
                ]
            }
            const setGroupPromise = await setGroup(groupObj)
            if(setGroupPromise.id == undefined) throw new Error('GROUP_FAILED')     
            console.log('group created')
        } catch (error) {
            if(error.message == 'CHAT_FAILED')console.log('CHAT_FAILED')
            if(error.message == 'GROUP_FAILED')console.log('GROUP_FAILED')
            console.log(error.message)
        }
     }
    
     const CreateGroupBtn = ()=>{
         return <TouchableOpacity onPress={()=>createGroup()} >
         <Gradiant  style={{...styles.btn,flexDirection:'row',marginRight:8}}>
             <FA name='calendar' size={20} color='#fff'/>
             <Text style={{color:'#fff',marginLeft:16}} >
                 Create Group 
             </Text>
         </Gradiant>
    </TouchableOpacity> 
     }

     const mprops = {
        modalVisible:modalVisible,
        setmodalVisible:setmodalVisible,
        height:"100%",
        title:"Create new group"
     }
    return (
             <Modal {...mprops} >
                  <TextInput 
                        style={styles.Input} 
                        placeholder="Group title"   
                        onChangeText ={text =>settitle(text)} 
                        value={title} 
                    />
                 <CheckBoxGroup  {...{list,select:setplan,title:'Plan'}}/>
                 
                 <CheckBoxGroup  {...{list:[...subjects.map(o=>o.title)],select:setsubject,title:'Subject'}}/>
                 <CreateGroupBtn />
       
             </Modal>
    )
}

var styles = StyleSheet.create({
    btn:{
        padding:16,
        elevation:5,
        borderRadius:12,
        marginBottom:16,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    Input:{
        padding:8 ,
        color:colors.black,
        backgroundColor:'#fff',
        elevation:5,
        width:'100%',
        height:50,
        borderRadius:12,
        marginBottom:8,
      },
});
export default NewGroup
