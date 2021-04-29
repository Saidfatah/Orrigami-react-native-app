import React from 'react'
import {StyleSheet, View,TouchableWithoutFeedback,Modal,Text} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../styles/variables';

const ModalWrraper=(props)=> {
    const {modalVisible, setmodalVisible,height,width,title}=props

    return (
         <View>
         <Modal visible={modalVisible} 
               transparent={true}
               animationType="fade" >
              <View onTouchStart={e=>setmodalVisible(false)}
              style={{...styles.modalContainer,backgroundColor:'black',opacity:.4}}>
              </View>
        </Modal>
         <Modal visible={modalVisible} 
               transparent={true}
               animationType="fade" >
              <View style={styles.modalContainer} >
                 <View style={{...styles.modal,height:height,width:width}}>
                    <View style={styles.FRB}>
                          <Text style={styles.modalTitle}>{title}</Text>
                         <TouchableWithoutFeedback onPress={e=>{setmodalVisible(false)}}>
                              <Icon name="close" color={colors.black} size={20} />
                         </TouchableWithoutFeedback>
                     </View>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                     {props.children}
                    </View>
                 </View>
              </View>
        </Modal>
         </View>
    )
}

var styles = StyleSheet.create({
    modalContainer:{
        justifyContent:'center',
        height:'100%',
        padding:16,
        alignItems:'center'
    },
    modalTitle:{
        fontSize:20
    },
    modal:{
        width:250,
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:25,
        padding:16,

    },
    FRB:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:16
    }

})
export default ModalWrraper
