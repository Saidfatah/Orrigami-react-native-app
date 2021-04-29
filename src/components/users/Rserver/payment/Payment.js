import React,{useState,useEffect,useContext} from 'react'
import { View ,Text,StyleSheet,TouchableNativeFeedback} from 'react-native'
import {colors} from '../../../../styles/variables'
import {ReservationContext} from '../../../../Context/Rservation'
import {AuthContext} from '../../../../Context/AuthProvider'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import {Reserver} from '../../../../FireBase/firebase'
import Loading from '../../../wrrapersAndElems/Loading'
import Group from './Group'
import Indivdual from './Individual'

const Payment =({navigation}) => {
   const [checkedValues, setcheckedValues] = useState([true,true,true,true,true,true,true])
   const {nexUser,topicContext,plans}=useContext(ReservationContext)
   const {user}=useContext(AuthContext)
   const [paymentStatus, setpaymentStatus] = useState('ready')
   const [reserving, setreserving] = useState(false)
   
   useEffect(() => {
        setcheckedValues(plans.map((p,i)=>i!=0?false:true))
   }, [])

   const submitRservation=async()=>{
      const {plan,isIndividual}=nexUser
      const {id,firstName,lastName,image}=user
      const fm=firstName + ' '+ lastName
      setreserving(true)

      let reservationFinal={
            client_id:id,
            isIndividual,
            plan:plan,
            client:{full_name:fm ,image:image},
      };
      if(isIndividual)
      {
         const {subject}=nexUser
         reservationFinal={...reservationFinal ,topic:topicContext,subject:subject}
      }
      else {
         const {group}=nexUser
          reservationFinal={ ...reservationFinal ,group:group}
      }   

      if(reservationFinal != undefined)
      {    
        try {
           const reservPromise =await Reserver(reservationFinal)
           if(reservPromise) {
                setreserving(false)
                setpaymentStatus('succes')
           }
        } catch (error) {
           setpaymentStatus('err')
           setreserving(false)
           console.log('reservation error')
           console.log(error)
        }
      }
   }


   if(paymentStatus=='ready')
   return (<Gradiant  style={styles.gradiant}>     
          <View style={styles.payment}>
               { nexUser.group == null
               ?<Indivdual {...{setcheckedValues,checkedValues,plans}} />
               :<Group group={nexUser.group} />
               }
               <TouchableNativeFeedback onPress={submitRservation}>
                  <View style={styles.btn}>
                         { reserving 
                            ?<Loading height={25} />
                            :<Text style={{color:"#fff",fontSize:20}}>Reserver</Text>
                            }
                  </View>
               </TouchableNativeFeedback>
          </View>
    </Gradiant>)
   if(paymentStatus=='err')
   return <Gradiant  style={styles.gradiant}>
      <Text style={{color:'#fff'}} >There is an error pleas try aggain </Text>
      </Gradiant>   
   if(paymentStatus=='succes')
   return <Gradiant  style={styles.gradiant}>
      <Text style={{color:'#fff',marginBottom:16,fontSize:20}}>Your reservatio has been submitted we will reach you soon  </Text>
      <TouchableNativeFeedback  onPress={e=>navigation.navigate('board',{screen:'Home'})}>
              <View  style={styles.bttn}>
                   <Text style={styles.text}>Go to home </Text>
              </View>
       </TouchableNativeFeedback>
      <TouchableNativeFeedback  onPress={e=>{
             setpaymentStatus('ready');
             navigation.navigate('Type');
             }}>
              <View  style={styles.bttn}>
                   <Text style={styles.text}>New reservation </Text>
              </View>
       </TouchableNativeFeedback>
   </Gradiant>  

}


var styles = StyleSheet.create({
     payment:{
        width:'100%',
        padding:16,
     },
     gradiant:{
        height:'100%',
        justifyContent:'center',
        padding:16
      },
     plan:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:50,
        padding:16,
        backgroundColor:'#fff',
        marginBottom:16,
        borderRadius:15
     },
     checkBox:{
        width:15,
        height:15,
        borderRadius:100,
        borderColor:colors.colors[1],
        borderWidth:2
     },
     checked:{
        backgroundColor:colors.colors[1],
    
     },
     unchecked:{
        backgroundColor:'#fff',
     },
     btns:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
       },
     btn:{
        flex:1,
        backgroundColor:'#fff',
        padding:16,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
       borderColor:'#fff',
       borderWidth:1
     },
     bttn:{
        height:50,
        elevation:5,
        marginBottom:8,
        backgroundColor:'#fff',
        padding:8,
        borderRadius:12,
        alignContent:'center',
        justifyContent:'center'
      },
     Inbtn:{
        width:'100%',
        backgroundColor:'#e2e2e2',
        opacity:.8,
        padding:16,
        borderRadius:50,
        marginBottom:8,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
     },
     Title:{
        fontSize:25,
        color:'#fff',
        marginBottom:8,
        textAlign:'left'
     },
     icon:{
        fontSize:20,
        marginRight:16,
        color:colors.black
     },
     text:{
        fontSize:20,
        textAlign:'center',
        color:colors.black
     },
 });


 export default Payment
