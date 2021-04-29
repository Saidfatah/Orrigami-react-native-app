import React,{useEffect,useState} from 'react'
import {StyleSheet,TouchableOpacity,Image,View,Text} from 'react-native'
import {colors} from '../../../styles/variables'

const Group=({group,selectGroup})=> {
      const [closed, setclosed] = useState(false)
      const [title, settitle] = useState('title')
      const [image, setimage] = useState()
    useEffect(() => {
      settitle(group.title)
      setclosed(group.open)
      setimage(group.image)
    }, [group.id])

    const openGroup=(group)=>{
        if(selectGroup)selectGroup(group)
    }

    return (
    <TouchableOpacity   
    style={styles.group}  
    onPress={e=>openGroup(group.id)}>
         <View style={styles.groupF}>
              <Image style={styles.img} source={group.image} />
             <Text style={styles.groupTitle}> {title}</Text>
         </View>
         <View  style={styles.openn}>
             <View style={closed? styles.open: styles.close}></View>
             <Text style={styles.teacher}>{group.teacher}</Text>
         </View>
    </TouchableOpacity>)
}

var styles = StyleSheet.create({
    openn:{flexDirection:'column',justifyContent:'center',alignItems:'flex-end'},
    group:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:10,
        marginBottom:8,
        padding:8,
        flex:1
    },
    flatList:{ 
        alignItems: 'center',
         justifyContent: 'center', 
         height:200,
         flex:1
    },
    groupTitle:{
        fontSize:18,
        color:colors.black
    },
    teacher:{
        fontSize:14,
        color:colors.grey
    },
    groupF:{flexDirection:'row',alignItems:'center'},
    img:{
        width:40,
        height:40
    },
    open:{
        width:15,
        height:15,
        borderRadius:100,
        backgroundColor:colors.green
    },
    close:{
        width:15,
        height:15,
        borderRadius:100,
        backgroundColor:colors.red
    },
    hunder:{width:'100%',height:25},
    f1:{flex:1}
 });
export default Group
