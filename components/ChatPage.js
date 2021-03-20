import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
  import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';

import {
  Dimensions,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const ChatPage = ({ route, navigation }) => {
  var chatWithUser = []
  const  each = route.params;
  
  const chatUserId = each.id
  const chatUserName=each.name
  
  const currentUserId = auth().currentUser.uid
  // const currentUserId = 'onjW3d67Vxed4oM403PGvpopRz02'
  var t=chatUserId+currentUserId
  const chatId=sortAlphabet(t)

  function sortAlphabet(str) {
  return [...str].sort((a, b) => a.localeCompare(b)).join("");
}

 
  const [messages, setMessages] = useState([]);
  const [load,setLoad]=useState(true)
  const fetchChats = async () => {
    setLoad(true)
    
    function onResult(QuerySnapshot) {
      try {
        chatWithUser = QuerySnapshot._data["chatWithUser"]
        setMessages(QuerySnapshot._data["chatWithUser"])
      } catch (e) {
        
        console.log(e)

      }
      setLoad(false)
  }

  function onError(error) {
    console.error(error);
    setLoad(false)
  }

   await firestore()
  .doc(`chats/${chatId}`)
  .onSnapshot(onResult, onError);
  }
   
  useEffect(() => {
    fetchChats()
    console.log(currentUserId)
  },[])
 
  
  
  const onSend = useCallback((messages = []) => {

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    messages[0].createdAt = Date(messages[0].createdAt).toString()
    // console.log(chatWithUser)
    try { chatWithUser.unshift(messages[0]) }
    catch (e) {
      chatWithUser.push(messages[0])
    }
    // console.log(new Date())
    firestore()
  .doc(`chats/${chatId}`)
  .set({chatWithUser})
  .then(() => {
    console.log('Chat added!');
  });
  }, [])
  if (load) {
    return null;
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      textInputProps={{
        style: {
          color: '#000',
          width: windowWidth * 0.8,
          marginLeft:10,
          
        }
      }}
      user={{
        _id: currentUserId,
      }}
    />
  )
}

export default ChatPage;