import React, { useState, useCallback, useEffect,useContext } from 'react'
import {View,Text} from 'react-native'
import { GiftedChat ,Bubble} from 'react-native-gifted-chat'
import {getChatMessages,addMessage} from '../../../FireBase/firebase'
import {AuthContext} from '../../../Context/AuthProvider'
import {colors} from '../../../styles/variables'


const Conersatons =(props) =>{
    const {navigation,route}= props
    const [chatId, setchatId] = useState('')
    const [messages, setMessages] = useState([]);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        navigation.setOptions({ title:route.params.name })
        setchatId( route.params.chatId )
        let unsubscribe 
        if(chatId !=''){
          unsubscribe = getChatMessages(chatId,doc=>{
            if(doc.exists){
             doc._data.messages.forEach((message,index) => {
                  setMessages(messages=>{
                   if([...messages].map(m=>m._id).indexOf(index) == -1)
                    return  GiftedChat.append(messages,{
                         _id: index,
                         text: message.content,
                         createdAt: new Date(),
                         user: {
                           _id: message.uid,
                           name: message.name,
                           avatar: message.image != 'no image'
                                  ?message.image
                                  :'https://placeimg.com/140/140/any',
                    }})  
                    else return messages
                  })
              });
            }
            else console.log('no such document')
        })
        }
        
        return () => {
          if(chatId !='' && unsubscribe) unsubscribe()
      }
      }, [chatId])
     
    const onSend = useCallback((messages = []) => {
          const message =messages[0]
          if(route.params.chatId != undefined)
          addMessage(route.params.chatId,user.userName,message.text,user.id,user.image)
          .then(r=>{
             if(r)return console.log('message set' )
             return console.log('porblem doesnt exist' )
          })
          .catch(err=>console.log(err))
    }, [])
    
    const renderBubble=(props)=>{
      const {currentMessage,previousMessage,nextMessage,isSameUser,isSameDay}=props

      if(previousMessage.user != undefined )
      {
           if(currentMessage.user._id == previousMessage.user._id )
           return <Bubble {...props}/>
      }
      // if (isSameUser(currentMessage, previousMessage) && isSameDay(currentMessage,previousMessage)) 
      //   
      return (
        <View>
          <Text style={{color:'red',
          alignSelf:currentMessage.user._id == user.id?'flex-end':'flex-start'
          ,padding:8,color:colors.black}}>
            {currentMessage.user.name}
            </Text>
          <Bubble {...props}/>
        </View>
      );
    }
    return (
        <GiftedChat
           messages={messages}
           onSend={messages => onSend(messages)}
           renderBubble={renderBubble}
           user={{
             _id:user.id,
             name:user.userName
           }}
      />
    )
}


export default Conersatons


// const obj ={
//   "actionSheet": null,
//    "alignTop": false,
//     "audioProps": {},
//      "bottomOffset": 0,
//       "currentMessage": 
//       {"_id": 0,
//        "createdAt": 2020-09-27T21:53:46.497Z,
//         "text": "Bonjour Rusttst Colee vous etes connecter avec votre nouveau Instructeur",
//          "user": {"_id": "5sBV8BF1KxSsQJCe7Z7aRRD3GCK2", "avatar": undefined, "name": "AliAli"}
//       },
//        "dateFormat": "ll",
//         "disableComposer": false,
//          "extraData": null,
//           "forceGetKeyboardHeight": false,
//            "forwardRef": { "current": null},
//             "imageProps": {},
//              "infiniteScroll": false, 
//              "inverted": true,
//               "invertibleScrollViewProps": {
//                 "inverted": true,
//                  "keyboardShouldPersistTaps": "always",
//                   "onKeyboardDidHide": [Function anonymous],
//                    "onKeyboardDidShow": [Function anonymous],
//                     "onKeyboardWillHide": [Function anonymous],
//                      "onKeyboardWillShow": [Function anonymous]}, 
//                      "isCustomViewBottom": false,
//                       "isKeyboardInternallyHandled": true,
//                        "isLoadingEarlier": false, 
//                        "isTyping": false,
//                         "keyboardShouldPersistTaps": "always",
//                          "lightboxProps": {}, 
//                          "listViewProps": {},
//                           "loadEarlier": false, 
//                           "locale": null,
//                            "maxComposerHeight": 200,
//                             "maxInputLength": null,
//                              "messageIdGenerator": [Function messageIdGenerator], 
//                              "minComposerHeight": 41,
//                               "minInputToolbarHeight": 44,
//                               "nextMessage": {},
//                               "onInputTextChanged": null,
//                                "onLoadEarlier": [Function onLoadEarlier],
//                                "onLongPress": null,
//                                "onLongPressAvatar": null,
//   "onPressActionButton": null,
//    "onPressAvatar": null,
//     "onQuickReply": [Function onQuickReply],
//      "onSend": [Function onSend],
//       "placeholder": "Type a message...", 
//       "position": "right",
//        "previousMessage": {},
//         "renderAccessory": null,
//          "renderActions": null,
//           "renderAvatar": undefined, 
//           "renderAvatarOnTop": false,
//            "renderBubble": [Function renderBubble],
//             "renderChatEmpty": null,
//              "renderChatFooter": null,
             
//              "renderComposer": null,
//               "renderCustomView": null,
//                "renderDay": null,
//                 "renderFooter": null,
//                 "renderInputToolbar": null, 
//                 "renderLoadEarlier": null, 
//                 "renderLoading": null, 
//                 "renderMessage": null,
//                  "renderMessageImage": null,
//                   "renderMessageText": null, 
//                   "renderSend": null, 
//                   "renderSystemMessage": null, 
//                   "renderTime": null,
//                    "renderUsernameOnMessage": false,
//                     "scrollToBottom": false,
//                      "scrollToBottomOffset": 200,
//                       "scrollToBottomStyle": {},
//                        "shouldUpdateMessage": undefined, 
//                        "showUserAvatar": false, "text": undefined,
//                         "textInputProps": {}, 
//                         "timeFormat": "LT",
//                          "user": {"_id": "5sBV8BF1KxSsQJCe7Z7aRRD3GCK2",
//                           "name": "AliAli"},
//                           "videoProps": {}
//                          , 
//                          "wrapInSafeArea": true}