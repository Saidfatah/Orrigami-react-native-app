import React,{useEffect} from 'react'
import {StyleSheet,View,Dimensions,Image,Text} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../../styles/variables'
import logo from '../../images/logo.png'
import FadeIn from '../../Animations/FadeIn'
import { CommonActions } from '@react-navigation/native';
import {getAuth} from '../../FireBase/firebase'

const wheight = Dimensions.get('window').height

const Home=()=> {
    const navigation =useNavigation()



    const redirect=(logged)=>{
      if(logged){ 
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name:'board', params: { screen: 'Home'}}],
          })
        );
      }
      else navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name:'login'}],
        })
      );
    }  
    useEffect(()=>{
      let getAuthUnsub ;
        const timer= setTimeout(() => { 
              getAuthUnsub = getAuth(user=>{
                  if(user) redirect(true)
                  else redirect(false)
              })
        }, 3000);
        return () => {
          timer && clearTimeout(timer) 
          getAuthUnsub && getAuthUnsub();
        }
    },[])
   
    return (
        <View style={styles.FV} >
            <FadeIn duration={2000}>
                <LinearGradient start={{x:0, y:1}} 
                            end={{x: 0.75, y: .25}} 
                            colors={colors.colors} 
                            style={styles.logo} >
                   <Image source={logo}  style={styles.logo} /> 
                </LinearGradient>
            <Text style={styles.logoText}>ORIIGAMI</Text>
            </FadeIn>
       </View>
    )
}
var styles = StyleSheet.create({
    logo:{
        height:100,
        width:100,
        borderRadius:25,
      },
      logoText:{
        textAlign:'center',
        fontSize:24,
        color:colors.grey
      }, 
    FV:{
      height:wheight,
      backgroundColor:'#fff',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
    },
  });
export default Home
