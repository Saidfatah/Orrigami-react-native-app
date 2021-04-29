import React,{useContext,useEffect} from 'react'
import {StyleSheet, View,Text,} from 'react-native'
import GroupList from '../../../Course/Groups/GroupList'
import {colors} from '../../../../styles/variables'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import {GroupsContext} from '../../../../Context/GroupsProvider'
import {ReservationContext} from '../../../../Context/Rservation'

const  Group =({navigation}) =>{
    const {groups} = useContext(GroupsContext)
    const {setindex,handelChange} = useContext(ReservationContext)
    
   
    const selectGroup=(index)=>{
          const selctedGroup =[...groups].filter(g=> g.id == index)
          selctedGroup && handelChange('group')(selctedGroup)
          setindex(3)
          navigation.navigate('Payment')
    }
  
     return (
     <Gradiant style={{height:'100%',justifyContent:'center',padding:16}}>
         <View style={styles.group}>
             <Text style={styles.Title}>Choisir un group </Text>
              <GroupList  groups={groups} selectGroup={selectGroup}/>
         </View>
     </Gradiant>
     )
 }

 var styles = StyleSheet.create({
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
       width:100,
       margin:2,
 
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
});
export default Group