import React from "react";
import {StyleSheet,TouchableOpacity,View,Text} from 'react-native'
import {colors} from '../../../styles/variables'
import LinearGradient from 'react-native-linear-gradient'
import Icon from './Icon'

const TabBar = ({ state, descriptors, navigation ,options}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const gradient = {
    start:{x:0, y:2} ,
    end:{x:0, y: -1} ,
    colors:colors.colors ,
    style:styles.linearGradient,
  }

  if (focusedOptions.tabBarVisible === false) return null;

  return <View style={styles.bg} >
    <LinearGradient {...gradient} >
  <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined  ? options.title: route.name;
        const isFocused = state.index === index;
        let icon 
        if(label == "Home") icon={lib:'FA',name:'institution'}
        if(label == "Rserver")icon = {lib:'FA',name:'bookmark'}
        if(label == "Chat")icon = {lib:'ET',name:'chat'}
        if(label == "Rservations")icon = {lib:'IO',name:'bookmarks'}
        if(label == "board")icon = {lib:'IO',name:'bookmarks'}

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex:1}}
          >
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Icon 
                  name={icon.name}
                  lib={icon.lib}
                  color={isFocused?'#fff':'#e3e3e3'}
                  size={isFocused?25:16}
                  />
                 <Text style={{color:isFocused?'#fff':'#e3e3e3'}}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  </LinearGradient>
  </View>
};


var styles = StyleSheet.create({
  linearGradient:{
      width:"100%",
      height:50,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      padding:16,
      elevation:10,
      overflow:'hidden',
      justifyContent:'center',
      alignItems:'center',
  },
  bg:{
      width:"100%",
      height:50,
      backgroundColor:'#fff'
  },
});
export default TabBar;






