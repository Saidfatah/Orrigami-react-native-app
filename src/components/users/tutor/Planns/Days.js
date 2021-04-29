import React,{useState,useEffect, createRef} from 'react'
import { StyleSheet, View, Text,FlatList,Dimensions, TouchableOpacity,} from 'react-native'
import {colors} from '../../../../styles/variables'
import {getMonthDaysTotal} from '../../../util/calender'
import AntIcon from 'react-native-vector-icons/AntDesign'
const width = Dimensions.get('window').width
const DAYWIDTH= ((width-8)/7)-4

//scroll to current week 
//next month && scrool to 0
//previous month  && scroll 29/28
// check if were in the end or heading back 
const Days=(props)=>{
    const [selectedDay, setselectedDay] = useState(new Date().getDate()+1)
    const [days, setdays] = useState([])
    const [currentWeek, setcurrentWeek] = useState(7)
    const flatListRef=createRef()
    const [intialIndex, setintialIndex] = useState(new Date().getDate())
    const [currentMonth, setcurrentMonth] = useState(new Date().getMonth() )
    const [intialzedDays, setintialzedDays] = useState(false)
    const {getTodaysPlannes,plasnBackground,setmodalVisible,activeMonths} = props
  

    const getCurrentWeek=()=>{
        const dayDays=days.map(d=>d.day)
        let week = 1 ; 
        let j = 0 ; 
        for (let i = 0; i < dayDays.length; i++) {
           if(j > 6){ week++ ; j = 0;}
           if(i == intialIndex)return (week-1) * 7
           j++;
        }
        return 0
    }
    

    useEffect(() => {
        if(days.length<1) {
            setdays(getMonthDaysTotal(currentMonth)) 
            setcurrentWeek(getCurrentWeek());
            // setcurrentDate(days.filter(d=>d.day==intialIndex)[0].date)
        }
        if(!intialzedDays && days.length>1){
            setcurrentWeek(getCurrentWeek())
            setintialzedDays(true);
        }
        
    }, [flatListRef.current,currentMonth,days.length])
    useEffect(() => {
       setdays(getMonthDaysTotal(currentMonth)) 
    }, [currentMonth])



    const scrollOnReload = (cw)=>{
        if(flatListRef.current && days.length>1 && cw!=-1 )
        flatListRef.current.scrollToIndex({index:cw,animated:true})
    }
    const scrollWeek=(dir)=>{
        const targetIndex = currentWeek +(dir*7)
        console.log('target index'+ targetIndex)
        if(targetIndex <0 ){
            scrollOnReload(0)
            const prevPlans =[...activeMonths].indexOf(currentMonth-1) != -1
            console.log('prev has plans ?' +prevPlans)
            if(prevPlans)
                setcurrentMonth(currentMonth-1)
            return setcurrentWeek(0)
        }
        if(targetIndex > 27){
             scrollOnReload(0)
             const prevPlans =[...activeMonths].indexOf(currentMonth+1) != -1
            console.log('prev has plans ?' +prevPlans)
            if(prevPlans)
                setcurrentMonth(currentMonth+1)
             return setcurrentWeek(0)
        }
        setcurrentWeek(targetIndex)
        scrollOnReload(targetIndex)
    }
    const CalenderNavigation=()=>{
        return <View style={styles.calnderNavigation}>
             <TouchableOpacity onPress={()=>{scrollWeek(-1)}}>
                <AntIcon name="leftcircle" color={colors.colors[2]} size={30}/>
             </TouchableOpacity>
             {/* <TouchableOpacity onPress={()=>setmodalVisible(true)}>
               <View style={styles.addPlan}>
                  <AntIcon name="pluscircle" color='#fff' size={30}/>
                   <Text style={{color:'#fff',marginLeft:8}}>Session</Text>
               </View>
             </TouchableOpacity> */}
             <TouchableOpacity onPress={()=>{scrollWeek(1)}}>
                <AntIcon name="rightcircle" color={colors.colors[2]} size={30} />
             </TouchableOpacity>
       </View>
    }
    const Day=({day,date,selected})=>{
        const daySelected = ()=>{
            setselectedDay(day+1)
            getTodaysPlannes(date)
        }

        const hasPlans = ()=>{
            const thisDate = new Date(date).getDate()
            const hasPlans= [...plasnBackground].filter(p=>new Date(p.time.date).getDate() ==thisDate )
            return hasPlans[0]?true : false
        }
        const dayBg = ()=>{
            return ({...styles.day,         
                backgroundColor:!selected?'#fff':colors.colors[2],
                borderWidth:selected?2:hasPlans()==true?2:0,
                borderColor:colors.colors[2],
            })
        }
        const dayText = ()=> ({ color:!selected?colors.colors[2]:'#fff',})

        return <TouchableOpacity onPress={daySelected}>
            <View style={{...dayBg()}}>
              <Text style={{...dayText()}}>{day}</Text>
            </View>
        </TouchableOpacity>
    }
    const DayLabels=()=>{
        const lb={color:colors.colors[2]}
        return <View style={styles.labelsContainer}>
             <View  style={styles.dayLabel}><Text style={lb}>S</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>M</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>S</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>S</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>S</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>S</Text></View>
             <View  style={styles.dayLabel}><Text style={lb}>M</Text></View>
        </View>
    }

    return <View style={{backgroundColor:'#fff'}}>
         <DayLabels />
         <FlatList
          data={days}
          horizontal={true}
          initialScrollIndex={currentWeek}
          ref={flatListRef}
          scrollEnabled={false}
          getItemLayout={(data, index) =>({length: DAYWIDTH, offset: (DAYWIDTH+4) * index, index})}
          contentContainerStyle={{padding:4}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index})=><Day 
                      key={index} 
                      day={item.day} 
                      selected={selectedDay==index?true:false} 
                      date={item.date} />}
          keyExtractor={(item,index)=>`feed_${index}`}
         />
         <CalenderNavigation />
    </View>

}

const styles =StyleSheet.create({
    calnderNavigation:{
        width:'100%',
        padding:8,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    addPlan:{
        flexDirection:'row',
        padding:8,
        borderRadius:10,
        alignItems:'center',
        backgroundColor:colors.colors[2]
    },
    day:{
        height:DAYWIDTH,
        width:DAYWIDTH,
        marginHorizontal:2,
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        elevation:5
    },
    dayLabel:{
        width:DAYWIDTH,
        alignItems:'center',
        justifyContent:'center',
        
    },
    labelsContainer:{
        flexDirection:'row',
        paddingHorizontal:8,
        paddingVertical:4,
        justifyContent:'space-around'
    },
})
export default Days
