import React,{useEffect,useRef} from 'react'
import {Animated} from 'react-native'
const FadeIn=props => {
    const {duration}=props
    const fadeAnim = useRef(new Animated.Value(0)).current  
    useEffect(()=>{
        Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: duration,
              useNativeDriver: true
            }
          ).start();
     },[fadeAnim])
    return (
        <Animated.View   
                        
          style={{
            ...props.style,
            opacity: fadeAnim,         
          }}
        >
          {props.children}
        </Animated.View>
    )
}

export default FadeIn
