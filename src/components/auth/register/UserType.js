import React from 'react'
import {StyleSheet,TouchableNativeFeedback,View,Text} from 'react-native'
import {colors} from '../../../styles/variables'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FA from 'react-native-vector-icons/FontAwesome';
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'


const UserType=({navigation}) =>{
    const navigate=(route)=>{
        navigation.navigate(route)
    }

    return (
        <Gradiant style={styles.gradiant}>
            <Text style={styles.text} >Enregistrer vous en tant que </Text>
            <TouchableNativeFeedback onPress={e=>navigate('register')} >
               <View style={{...styles.btn,flexDirection:'row'}}>
                 <Text style={{fontSize:25,color:colors.black}} >Etudiant</Text>
                  <FA name='mortar-board' size={25} color={colors.black}/>
               </View>
            </TouchableNativeFeedback>
            <Text  style={styles.text}>Au bien </Text>
            <TouchableNativeFeedback onPress={e=>navigate('tutorRegister')} >
               <View style={{...styles.btn,flexDirection:'row'}}>
                 <Text style={{fontSize:25,color:colors.black}} >Educateur</Text>
                  <Icon name='teach' size={25} color={colors.black}/>
               </View>
            </TouchableNativeFeedback>
        </Gradiant>
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
    text:{
        fontSize:25,
        color:'#fff',
        textAlign:'center',
        marginBottom:16
    },
    gradiant:{
        height:'100%',
        justifyContent:'center',
        padding:16
    },
});

export default UserType
