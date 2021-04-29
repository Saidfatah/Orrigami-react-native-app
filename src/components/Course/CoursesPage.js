import React,{useState} from 'react'
import {StyleSheet, View,TouchableNativeFeedback,Text,FlatList} from 'react-native'
import {colors } from '../../styles/variables'

const  CourseItem=(props) =>{
    const {title,tutor,participants,rating,schedule}= props.course
    const more=e=>{
      console.log('click')
    }

    return (
        <TouchableNativeFeedback  onPress={more}>
            <View style={{...styles.item}} >
                 <View style={styles.flexH}>
                     <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.tutor}>{tutor}</Text>
                     </View>
                 </View>
             </View>
        </TouchableNativeFeedback>
    )
}

const  CoursesPage=()=> {
    const [courses,setCourses]=useState([
        {
             title:'Algebra',
             tutor:'Aziz khalfi',
             participants:10,
             rating:3.5,
             schedule:'10:10'
        },
        {
             title:'Friction Powers',
             tutor:'Mouad Salhi',
             participants:5,
             rating:4,
             schedule:'10:10'
        },
        {
             title:'Conjugaison',
             tutor:'Issam Oha',
             participants:15,
             rating:6,
             schedule:'10:10'
        },
    ])
 
    const rendertem =({item})=>{
        return <CourseItem  
        onPress={() => console.log('course clicked')}
        course={item}  
        discount={item.discount}/>
    }
    return (
        <View>
            <FlatList 
               style={styles.list}
               data={courses}
               renderItem={rendertem}
               keyExtractor={(item,index)=>index.toString()}
            />
        </View>
    )
}
var styles = StyleSheet.create({
    courses:{
       display:'flex',
       height:20,
    },
    btnNormal: {
      borderColor: colors.colors[1],
      backgroundColor:'transparent',
      borderWidth: 1,
      borderRadius: 10,
      height: 30,
      width: 100,
    },
    btnPress: {
      borderColor: colors.colors[1],
      backgroundColor:colors.colors[1],
      overflow:'hidden',
      borderWidth: 1,
      borderRadius: 10,
      height: 30,
      width: 100,
    },
    item:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        marginBottom:8,
        padding:8,
        flex:1,
        elevation: 5,
    },
    flexH:{
       width:'100%',
       display:'flex',
       justifyContent:'space-between',
       flexDirection:'row',
    },
    title:{
        fontSize:24,
        color: colors.black,

    },
    tutor:{
        color: colors.grey,

    },
    buttons:{
      display:'flex',
      flexDirection:'row',
      height:100,
      width:'100%',
    },
 });
export default CoursesPage


   