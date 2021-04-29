import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet, View, Text,FlatList} from 'react-native'
import {colors} from '../../../../styles/variables'
import {getTutorPlannings} from '../../../../FireBase/firebase'
import {AuthContext} from '../../../../Context/AuthProvider'
import Days from './Days'
import Plan from './Plan'



const Plannes=({route})=> {
    const {user}= useContext(AuthContext)
    const [plasnBackground, setplasnBackground] = useState([ ])
    const [plans, setplans] = useState([])
    const [activeMonths, setactiveMonths] = useState([9,8,10])
    const [modalVisible, setmodalVisible] = useState(false)
    const [opendAssignment, setopendAssignment] = useState(false)
    const [assignment, setassignment] = useState({})
    const [intialzedDate, setintialzedDate] = useState(false)
  
    useEffect(() => {
        if(route.params && !opendAssignment){
            setmodalVisible(true)
            setopendAssignment(true)
            setassignment(route.params.assignment)
        }
        
        let unsubscribe
        if(plasnBackground.length < 1)
        {
            unsubscribe = getTutorPlannings(user.id,
            snapshot=>{
                const docs =snapshot.docs;
                if(docs[0] != undefined)
                {
                    let activeMonthsSet = new Set()
                    docs.forEach(plan=>{
                        const month =new Date(plan._data.time.date.toDate()).getMonth()
                        activeMonthsSet.add(month)
                    })
                    setactiveMonths([...activeMonthsSet])
                    setplasnBackground(docs.map(doc=>(
                       {
                        topic:doc._data.topic,
                        time:{
                            date:doc._data.time.date.toDate(),
                            start:doc._data.time.start,
                            end:doc._data.time.end
                        },
                        isGroup:doc._data.isGroup,
                        open:doc._data.open?doc._data.open:false,
                   }
                  )))
                }
            },
            err=>console.log(err)
            )
        }else if(plasnBackground.length > 1 && !intialzedDate){
             const cd = new Date()
             const y = cd.getFullYear();
             const d = cd.getDate();
             const m = cd.getMonth();
             getTodaysPlannes(new Date(y,m,d)) 
             setintialzedDate(true)
        }

        return ()=>{unsubscribe && unsubscribe()}
    }, [plans.length,plasnBackground.length])

    const getTodaysPlannes=(date)=>{
        const dateA= new Date(date)
        const planes= plasnBackground.filter(p=>{
            const planDate= new Date(p.time.date)
            if(planDate.getTime() == dateA.getTime())
            return p
        })
        if(planes[0]!=undefined)setplans(planes)
        else setplans([])
    }
    const Plans=()=>{
        const Plan=({plan})=>{
             const {isGroup,time,topic}=plan
             if(isGroup)
             {  
                 const {open}=plan
                 return (
                 <View  style={{...styles.plan}}>
                     <Text style={{ color:'#fff',marginRight:16}}>{topic}</Text>
                     <View style={{flexDirection:'row',alignItems:'center',marginRight:16}}>
                         <Text style={{color:'#fff'}}>{time.start}</Text>
                         <Text style={{color:'#fff'}}> to </Text>
                         <Text style={{color:'#fff'}}>{time.end}</Text>
                     </View>
                     <View style={{...styles.groupOpen, backgroundColor:open?'#fff':colors.red}}>
                           <Text style={{color:open?colors.black:'#fff'}}>{open?'open':'close'}</Text>
                     </View>
                 </View>
                )
             }
             return (
             <View style={{...styles.plan}}>
                  <Text style={{ color:'#fff' ,marginRight:16}}>{topic}</Text>
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                       <Text style={{color:'#fff'}}>{time.start}</Text>
                       <Text style={{color:'#fff'}}> to </Text>
                       <Text style={{color:'#fff'}}>{time.end}</Text>
                   </View>
             </View>)
             
        }
        if(plans.length>0) 
        return <FlatList
                 data={plans}
                 horizontal={false}
                 scrollEnabled={true}
                 contentContainerStyle={{padding:16}}
                 showsVerticalScrollIndicator={false}
                 renderItem={({item,i})=><Plan key={i} plan={item} />}
                 keyExtractor={(item, index) => `feed_${index}`}/>
        else return <Text style={styles.npPlans}>No sessions n this day </Text>
    }    
    

    return (
        <View>
            <Plan {...{modalVisible,setmodalVisible,assignment}}  />
            <Days {...{getTodaysPlannes,activeMonths,plasnBackground,setmodalVisible}} />
            <View style={{padding:16}}>
                 <View style={{backgroundColor:"#fff",marginTop:16,borderRadius:15}}>
                      <Plans />
                 </View>
            </View>
        </View>
    )
}


const styles =StyleSheet.create({
     plan:{
     padding:8,
     borderRadius:10,
     flexDirection:'row',
     elevation:5,
     margin:4,
     backgroundColor:colors.colors[2],
     alignItems:'center'
     },
     npPlans:{
        textAlign:'center',
        padding:16,
        backgroundColor:colors.red,
        width:"100%",
        color:'#fff',
        borderRadius:10,
        fontWeight:'bold'
     },
     groupOpen:{
         paddingVertical:2,
         paddingHorizontal:8,
         borderRadius:25,
     },

})
export default Plannes
