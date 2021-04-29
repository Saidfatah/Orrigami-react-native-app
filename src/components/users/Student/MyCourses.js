import React, { useState,useEffect,useContext} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native'
import {colors} from '../../../styles/variables'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconAnt from 'react-native-vector-icons/AntDesign'
import {AuthContext} from '../../../Context/AuthProvider'
import {getStudentCourses} from '../../../FireBase/firebase'

const CoursesList=()=>{
    const [coursesList,setcoursesList]=useState([])
    const {user} = useContext(AuthContext)
    useEffect(() => {
        let unsubscribe
        if(coursesList.length < 1)
        {
            unsubscribe = getStudentCourses(user.id,
            snapshot=>setcoursesList(snapshot.docs.map(doc=>doc._data.topic)),
            err=>console.log(err))
        }
        return () => {
            unsubscribe && unsubscribe()
        }
    }, [])
   
    const courseItem =({item})=>{
        return <View style={styles.courseItem}>
                   <Text style={{color:colors.grey}} >{item}</Text>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{console.log('navgate to course')}}>
                               <IconAnt   
                                name={'message1'} 
                                style={{color:colors.colors[1]}} 
                                size={25}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{console.log('navgate to course')}}>
                               <Icon   
                                name={'external-link-square'} 
                                style={{color:colors.colors[1],marginLeft:16}} 
                                size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
    }
    return <View style={{padding:16}} >
        <Text style={{color:colors.black,marginBottom:16}} >My courses</Text>
        <FlatList 
           data={coursesList}
           ListFooterComponent={()=><View style={{height:200}} />}
           renderItem={courseItem}
           keyExtractor={(item,index)=>index.toString()}
        />
    </View>
    
}

var styles = StyleSheet.create({
    courseItem:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      marginBottom:8,
      backgroundColor:'#fff',
      elevation:5,
      width:'100%',
      padding:8,
      borderRadius:12
      },
 });

export default CoursesList