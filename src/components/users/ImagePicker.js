import React, { useState,useContext,useEffect } from 'react'
import {StyleSheet,View,Text,Platform,TouchableOpacity} from 'react-native'
import ImagePPicker from 'react-native-image-picker';
import Modal from '../wrrapersAndElems/ModalWrraper'
import {AuthContext} from '../../Context/AuthProvider'
// import Loading from '../wrrapersAndElems/Loading'
// import storage from '@react-native-firebase/storage';
// import { showMessage, hideMessage } from "react-native-flash-message";

const ImagePicker=({ modalVisible,setmodalVisible,setuserImageRender})=>{
    // const {user,updateUser} = useContext(AuthContext)
    const [userImage, setuserImage] = useState(null)
    const [uploading, setuploading] = useState(false)
    useEffect(() => {
      console.log('set user image')
    }, [userImage])

    const uploadImage =async (selectedImage)=>{
    //   const uploadUri = Platform.OS === 'ios' ? selectedImage.replace('file://', '') : selectedImage;
    //   setuploading(true);
    //   const task = storage().ref('images/'+user.userName).putFile(uploadUri);
    //   task.on('state_changed', 
    //       sn =>{},
    //       err=>console.log(err),
    //       () => {
    //          console.log('Photo uploaded!'+user.userName)
    //          storage()
    //          .ref("images").child(user.userName).getDownloadURL()
    //          .then(url => {
    //            console.log('uploaded image url', url);
    //            updateUser('image',url);
    //            setuserImageRender(url);
    //            setuploading(false);
    //            setmodalVisible(false);
    //          }).catch(err=>console.log(err))
    //      }
    //    )

    //   try{await task;}catch (r){console.log("error :"+r)}
    }
    const addImageToList=r=>{
      if (r.didCancel) {
       return console.log('User cancelled image picker');
      } else if (r.error) {
        return console.log('ImagePicker Error: ', r.error);
      } else if (r.customButton) {
        return  console.log('User tapped custom button: ', r.customButton);
      } 
      console.log(r.uri)
    //   setuserImage(r.uri)
      // if(r.uri != null )uploadImage(r.uri)
     
}
    const openGallery=e=>{
      const options ={noData:true, title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },}
      ImagePPicker.launchImageLibrary(options,addImageToList)
    }
    const openCamera=e=>{
          const options ={noData:true}
          ImagePPicker.launchCamera(options,addImageToList)
    }
    const ImagePickerButtons=()=>{
      return <View>
          <TouchableOpacity onPress={()=>openGallery()}>
          <View style={styles.btn}>
               <Text>Ovrire le gallery</Text>
          </View>
      </TouchableOpacity>
          <TouchableOpacity onPress={()=>openCamera()}>
          <View style={styles.btn}>
               <Text>Ovrire la camera</Text>
          </View>
      </TouchableOpacity>
      </View>
    }
    return <Modal 
            title="Image du profil"
            modalVisible={modalVisible} 
            setmodalVisible={setmodalVisible}
            height={200}>
            {!uploading ?<ImagePickerButtons />:<View />}
          </Modal>
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
 });

export default ImagePicker
