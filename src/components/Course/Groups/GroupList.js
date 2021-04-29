import React,{useState,useEffect} from 'react'
import {StyleSheet, FlatList} from 'react-native'
import GroupItem from './Group'
const GroupList =({groups,selectGroup,height}) =>{
    const [groupsList, setgroupsList] = useState([])
    const [groupsToRender, setgroupsToRender] = useState([])
    useEffect(() => {
        setgroupsList(groups)
        setgroupsToRender(groups)
    }, [groups])
    
    const addStyle =height
    ?({height:'100%'})
    :({margin:16,height:200,borderWidth:1})

    return (
        <FlatList 
                  data={groupsToRender}
                  style={{...styles.list,...addStyle}}
                  contentContainerStyle={props =>(styles.flatList)}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =><GroupItem group={item} selectGroup={selectGroup}/>}
                  keyExtractor={(item, index) => index.toString()}
        />
    )
}

var styles = StyleSheet.create({
    list:{
        borderColor:'#fff',
        padding:16,
   },
    flatList:{ 
        alignItems: 'center',
         justifyContent: 'center', 
         height:200,
         flex:1
    },
 });
export default GroupList
