import React from 'react'
import {StyleSheet} from 'react-native'
import Gradiant from './GradiantWrraper'

const HeaderWrapper=(props)=> {
    return  <Gradiant style={styles.header} >{props.children}</Gradiant>
}

var styles = StyleSheet.create({
    header:{
        width:'100%',
        height:50,
        padding:16,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },

 });
export default HeaderWrapper
