import React from 'react'
import {StyleSheet, View,Image,Dimensions,Text,TextInput,TouchableNativeFeedback} from 'react-native'
import {colors} from '../../../../styles/variables'
import Icon from 'react-native-vector-icons/FontAwesome';
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import { CommonActions } from '@react-navigation/native';

const wheight = Dimensions.get('window').height

const Plann=({navigation})=> {
    const reserver=()=>{
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name:'board', params: { screen: 'Rserver'}}],
            })
          );
       }
    const goHome=()=>{
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name:'board', params: { screen: 'Home'}}],
        })
      );
    }
    return (
      <Gradiant style={styles.gradiant}>
         <Text style={{color:'#fff',fontSize:25,textAlign:'center',marginBottom:16}} >Registrer avec succes</Text>
        <View style={{alignItems:'center',justifyContent:'center',width:'100%'}} >
                      <TouchableNativeFeedback onPress={e=>reserver()} >
                           <View style={{...styles.login,flexDirection:'row',marginRight:8}}>
                             <Text style={{color:colors.black}} >Reserver une science</Text>
                              <Icon name='bookmark' size={20} color={colors.black}/>
                           </View>
                      </TouchableNativeFeedback>
                      <Text style={{color:'#fff',textAlign:'center',padding:10}}>au bien</Text>
                      <TouchableNativeFeedback onPress={e=>goHome()} >
                             <View style={{...styles.login,flexDirection:'row'}}>
                               <Text style={{color:colors.black}} >Accueil</Text>
                                <Icon name='institution' size={20} color={colors.black}/>
                             </View>
                      </TouchableNativeFeedback>
      </View>

      </Gradiant>
    )
}


var styles = StyleSheet.create({
  gradiant:{
    height:'100%',
    justifyContent:'center',
    padding:16
  },
    login:{
      padding:16,
      width:'100%',
      elevation:5,
      borderRadius:12,
      alignItems:'center',
      paddingHorizontal:70,
      justifyContent:'space-between',
      backgroundColor:'#fff'
    },
    FV:{
      height:wheight-50,
      backgroundColor:'#fff',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
  });

export default Plann
