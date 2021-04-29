import React from 'react'
import {StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../../styles/variables'

const GradiantWrraper =(props)=> {
    const {height,style,s,e}= props
    const graediant = {
        start:s?s:{x:0, y: 2},
        end:e?e:{x: 0.75, y: 0},
        style:style?style:styles.gradiant,
        colors:colors.colors
    }
    return (
        <LinearGradient {...graediant}>
            {props.children} 
        </LinearGradient>
    )
}
var styles = StyleSheet.create({
    gradiant:{
        padding:16,
        justifyContent:'center'
     },

 });
export default GradiantWrraper
