import React from 'react'
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import Modal from '../../wrrapersAndElems/ModalWrraper'
import {addStudent} from '../../../FireBase/firebase'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import FA from 'react-native-vector-icons/FontAwesome'



const AcceptStudent=({student,group,modalVisibleAccept, setmodalVisibleAccept})=> {
    
    const acceptSTudentToGroup =async ()=>{
        try {
            const addStudentPromise =await addStudent(group.id,student)
            console.log(addStudentPromise)
            // setmodalVisibleAccept(false)
        } catch (error) {
            
        }
    }
   
    const mprops = {
        modalVisible : modalVisibleAccept,
        setmodalVisible : setmodalVisibleAccept,
        height:150,
        title:"Create new group"
     }
    if(student == undefined || group == undefined) return <View />
    return (
        <Modal {...mprops} >
             <TouchableOpacity onPress={()=>acceptSTudentToGroup()} >
                  <Gradiant  style={{...styles.btn,flexDirection:'row',marginRight:8}}>
                      <FA name='calendar' size={20} color='#fff'/>
                      <Text style={{color:'#fff',marginLeft:16}} >
                           {'Add '+student.name +' to members of ' +group.title +' group' }   
                      </Text>
                  </Gradiant>
             </TouchableOpacity> 
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
});
export default AcceptStudent
