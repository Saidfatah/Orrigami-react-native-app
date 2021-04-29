import React from "react";
import ET from 'react-native-vector-icons/Entypo'
import FA from 'react-native-vector-icons/FontAwesome'
import IO from 'react-native-vector-icons/Ionicons'

const Icon = ({ name, color, size,lib, ...props }) => {
  if(lib=="FA")return <FA  name={name} color={color} size={size}/>
  if(lib=="ET")return <ET  name={name} color={color}  size={size}/>
  if(lib=="IO")return <IO  name={name} color={color}  size={size}/>
};

export default Icon;