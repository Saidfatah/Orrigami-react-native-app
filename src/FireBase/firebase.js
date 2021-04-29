import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


//#region auth
export  const SignOut = ()=>auth().signOut()
export  const Loggin = (email, password)=>{
    return auth().signInWithEmailAndPassword(email, password)  
}
export const getAuth =clb=>auth().onAuthStateChanged(clb);

export const ListenToUser= ()=>{

    //   auth().onAuthStateChanged(onAuthStateChanged);
    //   const uId= auth().currentUser.uid;
    //   if(user)
    //   {
    
    //   }else{
    //      navigation.navigate('login')
    //   }
}
export const  getLoggedUser = (userId,clb,ct)=>{
    return firestore().collection('users').where('userId','==',userId).onSnapshot(clb,ct)
}
//#endregion       

//#region users
export const getUser=(id,callb)=>{
    firestore()
    .collection('users')
    .doc(id)
    .onSnapshot(callb,err=>console.log(err))
}
export const checkEmail = email=>auth().fetchSignInMethodsForEmail(email)

export const setUser=(email,password,userData)=>{
    return auth()
           .createUserWithEmailAndPassword(email, password)
           .then(() =>auth().currentUser.uid)
           .then(uid=> firestore()
                      .collection("users")
                      .add({ userId:uid,...userData})
            )
         
}
export const checkUserName =(userName)=>{
    return  firestore()
           .collection("users")
           .where('userName','==',userName)
           .get()
           .then(doc=>doc.docs[0]!= undefined)
}

export const updateUserField= (field,value,userId)=>{
    return firestore()
    .collection('users')
    .doc(userId||'1GyVvm8LbQYHB9GcbXRO')
    .update({[field]:value})
}

export const setNotif=(notif)=>{
    const created_at = firestore.FieldValue.serverTimestamp()
    return firestore().collection('notifications').add({...notif,created_at,checked:false})
}
export const checkNotif=(notifId)=>{
    return firestore()
    .collection('notifications')
    .doc(notifId)
    .update({checked:true})
}
export const getNotifs=(uid)=>{
    return firestore()
    .collection('notifications')
    .where('owner_uid','==',uid)
    .where('checked','==',false)
    .orderBy('created_at','desc')
    .get()
}

//#endregion

//#region reservation 
export const Reserver=(reservaton)=>firestore().collection("reservations").add({...reservaton,status:'pending'})

export const getAllReservations = (clb)=>{
    const user =firestore().collection('reservations')
    user.get()
    .then(clb)
    .catch(err=>console.log(err))
}
const AsignCourseToInsctructor = ()=>{
    //array of asignments , asignment has statu('checked')
}
const ReserverReply=()=>{

}
//#endregion

// #region tutor 
    export const getStudentCourses=(uid,clb,err)=>{
        return firestore()
        .collection('plannings')
        .where('student_id','==',uid)
        .onSnapshot(clb,err)
    }
    export const getTutorPlannings=(uid,clb,err)=>{
        return firestore()
        .collection('plannings')
        .where('tutor_id','==',uid)
        .onSnapshot(clb,err)
    }
    export const getTutorPlanningsIndividual=(uid)=>{
        return firestore()
        .collection('plannings')
        .where('tutor_id','==',uid)
        .where('isGroup','==',false)
        .get()   
    }
    export const setPlan=(plan,tutorId)=>{
       return  firestore()
              .collection("plannings")
              .add(plan)
    }
    export const getTutors=(callb)=>{
       return firestore().collection('users').where('type','==','TUTOR').get()
    }

    export const checkRatingExist=(planId)=>{
       return firestore().collection('ratings').where('plan_id','==',planId).get()
    }
    export const setRating=(rating)=>{
        const created_at = firestore.FieldValue.serverTimestamp()
        return firestore().collection('ratings').add({...rating,created_at})
    }
    export const updateRating=(rating,msg,id)=>{
       return firestore()
             .collection('ratings')
             .doc(id)
             .update({'rating':rating})
    }

//#endregion

//#region groups
export const getGroups=(limit)=>firestore().collection('groups').limit(limit).get() 
export const setGroup=(group)=>{
    const created_at=firestore.Timestamp.fromDate(new Date())
    return firestore()
    .collection("groups")
    .add({...group,created_at})
}
export const addStudent=(grouId , student )=>{
      const groupRef = firestore().collection("groups").doc(grouId)
      return groupRef.update({
        members:firestore.FieldValue.arrayUnion({id:student.id,name:student.name})
       });
}


//#endregion


// #region chat
//when user is added to group update members array add user id 
//array of user every user has image id , name 
export const geChats = (uid,clb,ct)=>{
   return firestore()
    .collection('chats')
    .where('membersIds','array-contains',uid)
    .onSnapshot(clb,ct)
}
export const getChatMessages = (chatId,clb)=>{
    firestore()
    .collection('chats')
    .doc(chatId)
    .onSnapshot(clb)
}

export const creatChat=(author,other,message)=>{
     //incase of gorup get groupdata 
     //create array of members name image 
     const datee=firestore.Timestamp.fromDate(new Date())
     let chat = {
        created_at:datee,
        uid:other.id,
        latest_message:message||'has started a conversation',
        messages:[
           {
              content:message||'has started a conversation',
              uid:author.id,
              name:author.name,
              created_at:datee
           }
        ],
        isGroup: false,
        members:[author,other],
        membersIds:[author.id,other.id]
     }
    return  firestore().collection("chats").add(chat)
}
export const creatGroupChat=(tutor,title,latest_message)=>{
     const datee=firestore.Timestamp.fromDate(new Date())
     let chat = {
        created_at:datee,
        uid:tutor.id,
        title,
        latest_message,
        messages:[
           {
              content:latest_message,
              uid:tutor.id,
              name:tutor.name,
              created_at:datee
           }
        ],
        isGroup: true,
        members:[tutor],
        membersIds:[tutor.id]
     }
    return  firestore().collection("chats").add(chat)
}

export const addMessage = (chatId,name,latest_message,uid,image)=>{
       const datee=firestore.Timestamp.fromDate(new Date()) 
       const chatRef = firestore().collection("chats").doc(chatId)
       const message ={
             content:latest_message,
             created_at:datee,
             uid,
             name,
             image
        }
       return chatRef.get().then(doc=>{
            if(doc.exists){
                  chatRef.update({
                    messages:firestore.FieldValue.arrayUnion(message),
                    latest_message
                   });
            }
            return doc.exists
       }) 
       
}
export const checkChatExists = (id1,id2)=>{
       return firestore().collection("chats")
       .where('membersIds','array-contains-any',[id1,id2])
       .get()
}

//#endregion