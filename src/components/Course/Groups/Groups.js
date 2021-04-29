import React,{useContext,useEffect,useState} from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native'
import GroupList from './GroupList'
import {AuthContext} from '../../../Context/AuthProvider'
import {GroupsContext} from '../../../Context/GroupsProvider'
import NewGrou from './NewGroup'
import AcceptStudent from './AcceptStudent'


const Groups = ({navigation,route})=> {
     const {groups} = useContext(GroupsContext)
     const {user} = useContext(AuthContext)
     const [modalVisible, setmodalVisible] = useState(false)
     const [modalVisibleAccept, setmodalVisibleAccept] = useState(true)
     const [groupsRnder, setgroupsRnder] = useState([])
     useEffect(() => {
         if(route.params != undefined) 
             console.log(route.params.groupRequest)
        if(groupsRnder.length<1) setgroupsRnder(groups)
  
         return () => {
         }
     }, [groups,groupsRnder.length])
     
     const CreateGroupBtn=()=>{    
         if(user.type == 'TUTOR')
             return <TouchableOpacity onPress={()=>setmodalVisible(true)} >
                <View style={{backgroundColor:'#fff', padding:8,borderRadius:12,elevation:5 }} >
                    <Text>Create new group</Text>
                </View>
             </TouchableOpacity>
         return <View />
     }

     return (
         <View style={{padding:16}}>            
             <CreateGroupBtn />
             <NewGrou {...{modalVisible, setmodalVisible}} />
             { 
                route.params!= undefined
                ?<AcceptStudent {...{
                   modalVisibleAccept,
                   setmodalVisibleAccept,
                   student:route.params.groupRequest.student,
                   group :route.params.groupRequest.group
                  }}/>
                :<View />
             }
             <GroupList groups={groupsRnder} />  
         </View>
     )
}
var styles = StyleSheet.create({
 });
export default Groups
