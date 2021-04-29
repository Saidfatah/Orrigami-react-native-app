import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {colors} from '../../../styles/variables'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
const TutorBody =()=> {
    return (
        <View style={{padding:8}}>
                 <View style={styles.section}>
                     <Text style={{color:colors.grey,marginBottom:8,fontSize:20}}>Description</Text>
                     {/* <Icon  name="police-badge" style={styles.badge}/> */}
                     <Text style={{color:colors.black}}>
                         Im a simple man whose passionat about numbers , that's it !
                     </Text>
                 </View>
                 <View style={styles.section}>
                     <Text style={{color:colors.grey,marginBottom:8,fontSize:20}}>Experiences</Text>
                      <Gradiant  s={{x:2,y:1}} e={{x:0,y:0}} style={styles.exp}>
                           <Text style={{color:'#fff',marginRight:16}}>Teaching at school</Text>
                           <Text style={{color:'#fff'}}>2017/2018</Text>
                      </Gradiant>
                      <Gradiant  s={{x:2,y:1}} e={{x:0,y:0}} style={styles.exp}>
                           <Text style={{color:'#fff',marginRight:16}}>Freelancing</Text>
                           <Text style={{color:'#fff'}}>2016/2017</Text>
                      </Gradiant>
                      <Gradiant  s={{x:2,y:1}} e={{x:0,y:0}} style={styles.exp}>
                           <Text style={{color:'#fff',marginRight:16}}>Liscene</Text>
                           <Text style={{color:'#fff'}}>2013/2016</Text>
                      </Gradiant>
                 </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section:{
        width:'100%',
        padding:16,
        backgroundColor:'#fff',
    },
    exp:{
        marginBottom:8,
        padding:8,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:12,
    },
    badge:{
        color:colors.red
    }
})
export default TutorBody
