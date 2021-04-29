import React,{useState,useEffect} from 'react'
import {StyleSheet,Text, FlatList,Image,TouchableOpacity,View} from 'react-native'
import {colors} from '../../../styles/variables'
import LinearGradient from 'react-native-linear-gradient'
import {getTutors} from '../../../FireBase/firebase'
import noimage from '../../../images/noImage.jpg'

const Tutors=({navigation})=> {
    const [tutors,setTutors]=useState([])
    const loadTutor=(categ)=>{
        console.log(categ)
    }
    useEffect(() => {
        let unsub ; 
        if(tutors.length <1)
        {
            unsub= getTutors()
             .then(res=>{
                 console.log(res.docs)
                 setTutors(res.docs.map(t=>(
                    {
                        id:t._data.userId,
                        name:t._data.userName,
                        Disponible:t._data.available,
                        image:t._data.image
                    }
                )))
             })
             .catch(err=>console.log(err))
        }
        // return () => {unsub && unsub()}
    }, [tutors.lenght])
    
    const gradient = {
        start:{x:0, y:0} ,
        end:{x: 0.75, y:0} ,
        colors:['#020024','#43cf62'],
        style:styles.tutor
   }

    const Tutor=({tutor})=>{
        return <TouchableOpacity    onPress={e=>loadTutor(tutor.id)}>
                  <LinearGradient  {...gradient}>
                  <View style={styles.groupF}>
                             <Image style={styles.img} source={tutor.image!='no image'?{uri:tutor.image}:noimage} />
                            <Text style={styles.name}>{tutor.name}</Text>
                 </View>
                  <View style={tutor.Disponible ? styles.open: styles.close}>
                           <Text style={tutor.Disponible ?styles.disponilbe : styles.undisponilbe}>
                               {tutor.Disponible
                               ?'Disponible'
                               :'Occupe'
                          }</Text>
                  </View>
            </LinearGradient>
     </TouchableOpacity>
    }
    return (
        <View style={ {padding:16}} >
            <FlatList 
                  contentContainerStyle={props =>(styles.flatList)}
                  showsVerticalScrollIndicator={false}
                  data={tutors}
                  renderItem={({ item }) =><Tutor tutor={item} />}
                  keyExtractor={(item, index) => index.toString()}
             />
       </View>
    )
}
var styles = StyleSheet.create({
    tutor:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        padding:8,
        marginBottom:8,
        flex:1,
        alignItems:'center'
    },
    gradiant:{
           flexDirection:'row',
           alignItems:'center',
           width:200,
    },
    flatList:{ 
        flexDirection:'column',
    },
    name:{
        fontSize:18,
        marginLeft:8,
        color:'#fff'
    },
    groupF:{flexDirection:'row',alignItems:'center'},
    img:{
        width:70,
        height:70,
        borderRadius:100,
    },
    disponilbe:{
        fontSize:14,
        color:colors.black
    },
    undisponilbe:{
        fontSize:14,
        color:'#fff'
    },
    open:{
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        width: 100,
        height:30,
        backgroundColor:'#fff'
    },
    close:{
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        width: 100,
        height:30,
        backgroundColor:colors.red
    },
    hunder:{width:'100%',height:25},
    f1:{flex:1}
 });
export default Tutors
