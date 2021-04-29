import React,{useState,useEffect,useContext} from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity,TextInput } from 'react-native'
import Gradiant from '../wrrapersAndElems/GradiantWrraper'
import Modal from '../wrrapersAndElems/ModalWrraper'
import Rating from '../wrrapersAndElems/Rating'
import {checkRatingExist,setRating as rateApi,updateRating} from '../../FireBase/firebase'
import {AuthContext} from '../../Context/AuthProvider'
import {colors} from '../../styles/variables' 

const CoursePage = ({ navigation ,route})=> {
    const {user} =useContext(AuthContext)
    const [course,setCourse]=useState({
        chatId:'course 1 ',
        title:'Arabic course',
        tutor:{
             id:'tutorid',
             name:'ALi Ali',
             image:'https://firebasestorage.googleapis.com/v0/b/origami-75bb3.appspot.com/o/images%2FRustttt%20chole?alt=media&token=f102953f-4eac-43b3-a918-abce94cfbcdb'
        },
        planning:{start:'10:00',end:'12:00'},
        plan_id:'plan Id ',
        rating:4,
    })
    const [modalVisible, setmodalVisible] = useState(false)
    const [rating, setrating] = useState(0)
    const [ratingText, setratingText] = useState('msg rating')

    useEffect(()=>{
        if(route.params.chatId)
        {
            const {chatId,tutor,planning,title}=route.params
            navigation.setParams({courseName:title})
            setCourse({
                chatId,
                title,
                tutor,
                planning,
                plan_id:planning.id,
                rating:4,
            })
        }
    },[])
     
    const Tutor = ()=>{
        return <View style={{...styles.field,...styles.FRS}}  >
        <Text>Tutor :  </Text>
       <Text>{course.tutor.name} </Text>
   
    <View style={{marginLeft:8,elevation:5,height:40,width:40,borderRadius:100}}>
         <Image source={{uri:course.tutor.image}} style={{height:40,width:40,borderRadius:100}} />
    </View>

</View>

    }
    const Course = ()=>{
        return <View style={{...styles.FRS,...styles.field}} >
        <Text>course :  </Text>
        <View style={styles.FRS} >
           <Text style={{textAlign:'center'}}>{course.title}</Text>
        </View>
    </View>
    

    }
    const Date = ()=>{
        return              <View style={{...styles.FRS,...styles.field}} >
        <Text>from :  </Text>
        <Gradiant style={styles.tag} >
             <Text style={{color:'#fff'}} >{course.planning.start}</Text>
        </Gradiant>
        <Text> to </Text>
        <Gradiant style={styles.tag} >
        <Text style={{color:'#fff'}} >{course.planning.end}</Text>
        </Gradiant>  
    </View>
   
    

    }
    const Actions = ()=>{
        return <View style={{...styles.FRS,...styles.field}} >
        <TouchableOpacity onPress={()=>{
             navigation.navigate('convo',{name :course.tutor.name,chatId:course.chatId})
        }} >
             <Gradiant style={{borderRadius:25,padding:16}} >
                   <Text style={{color:'#fff'}} >Open chat</Text>
             </Gradiant>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setmodalVisible(true)}>
             <Gradiant style={{borderRadius:25,padding:16,marginLeft:8}} >
                   <Text style={{color:'#fff'}} >Rate session</Text>
             </Gradiant>
        </TouchableOpacity>
    </View>
   
    

    }
    const rate=async()=>{
         try {
             const checkPlanExistsPromise= checkRatingExist(course.plan_id)
             if(checkPlanExistsPromise.docs == undefined){
                 console.log('plan doesnt exist')
                 const ratingObj={
                     tutor:{...course.tutor},
                     student:{name:user.userName,id:user.id,image:user.image},
                     rating,
                     plan_id:course.plan_id,
                     course:{topic:course.title},
                     msg:ratingText
                 }  
                 const setRatingPromise = await rateApi(ratingObj)
                 console.log(setRatingPromise)
                 if(setRatingPromise.id == undefined) throw Error('RATING_FAILED')
                 console.log('reated')
             }else{
                console.log('plan exists so update')
                const updateRatingPromise=await updateRating(rating,ratingText,checkPlanExistsPromise.docs[0].id)
                 if(updateRatingPromise.id == undefined) throw Error('UPDATING_FAILED')
             }

         } catch (error) {
              if(error.message == 'RATING_FAILED')console.log('RATING_FAILED')
              console.log(error.message)
         }
    }

    return (
        <View style={styles.course} >
            <Modal  {...{modalVisible, setmodalVisible,title:'Rate Course'}} >
                 <TextInput 
                    value={ratingText} 
                    placeholder='Ratng description'
                    style={{...styles.Input}}
                    onChangeText={text=>setratingText(text)} 
                />
                <View style={styles.FRS} >
                   <Rating {...{rating, setrating}} />
                   <TouchableOpacity onPress={()=>rate()} >
                       <Gradiant style={{borderRadius:25,padding:8}} >
                             <Text style={{color:'#fff'}} >Submit</Text>
                       </Gradiant>
                   </TouchableOpacity>
                </View>
            </Modal>
            <Tutor />
            <Course />
            <Date />
            <Actions />
        </View>
    )
}

var styles = StyleSheet.create({
    field:{
       padding:12,
       backgroundColor:'#fff'
    },
    course:{
       width:'100%',
       height:'100%',
       padding:16
    },
    Input:{
        padding:8 ,
        color:colors.black,
        backgroundColor:'#fff',
        width:'100%',
        elevation:5,
        height:50,
        borderRadius:12,
        marginBottom:8,
      },
    tag:{
       backgroundColor:'green',
       color:'#fff',
       borderRadius:16,
       padding:4
    },
    FRS:{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}
 });
export default CoursePage
