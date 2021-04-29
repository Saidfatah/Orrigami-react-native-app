import React from 'react'
import {Dimensions,StatusBar,Image,View} from 'react-native'
import logoImage from '../images/logo.png'
import LinearGradient from 'react-native-linear-gradient'
import{colors} from '../styles/variables'

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height ;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
const height = Dimensions.get('window').height -navbarHeight -60;
const width = Dimensions.get('window').width;
const widthOffset=50
const tabBarHeight=50
const headerHeight=50

const  Logo=()=>{
    return<View style={{  
        left:width/2, 
        position:'absolute', 
        transform: [{ translateX: -widthOffset }],
        top:(height/2)-tabBarHeight, 
        }}>
              <LinearGradient start={{x:0, y:1}}  end={{x: 0.75, y: .25}}  colors={colors.colors}  style={{  alignItems:'center', justifyContent:'center', borderRadius:25,  }} >
               <Image  source={logoImage}style={{height:100, width:100}}/>
            </LinearGradient>
    </View>
}
export default Logo