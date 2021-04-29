import React,{useState,useContext} from 'react'
import {StyleSheet,View,Text,TouchableWithoutFeedback} from 'react-native'
import { colors } from '../../../styles/variables'
import {AuthContext} from '../../../Context/AuthProvider'

const Filter=({setreservationsRender,reservations})=>{
    const {packs,subjects}=useContext(AuthContext)
    const [pack, setpack] = useState(0)

    const [sessionTypes, setsessionTypes] = useState(['global','individual','group'])
    const [sessionType, setsessionType] = useState(0)
    const [subjectFilter, setsubjectFilter] = useState(0)

    const filterRservations =(filterChanel)=>{
        const filterSubject =()=>{

            if(subjectFilter==NaN)setsubjectFilter(0)
            if(subjectFilter>=subjects.length)setsubjectFilter(0)
            else setsubjectFilter(subjectFilter+1)
    
            let subjectText
            if(subjectFilter==0) return setreservationsRender(reservations)
            subjectText = subjects[subjectFilter]
    
            const filterdReservations= reservations.filter(r=>r.isIndividual && r.subject==subjectText)
            setreservationsRender([...filterdReservations])
        }
        const filterPack =()=>{
            if(pack==NaN)setpack(0)
            if(pack>=subjects.length)setpack(0)
            else setpack(pack+1)
    
            let packText
            if(pack==0) return setreservationsRender(reservations)
            packText = packs[pack]

            const filterdReservations= reservations.filter(r=>r.plan!=packText)
            setreservationsRender([...filterdReservations])
        }
        const filterSession =()=>{
            if(sessionType==NaN)setsessionType(0)
            if(sessionType>=subjects.length)setsessionType(0)
            else setsessionType(sessionType+1)
            let filterdReservations
            if(sessionType==0) return setreservationsRender(reservations)
            if(sessionType==1)filterdReservations= reservations.filter(r=>r.isIndividual==true)
            if(sessionType==2)filterdReservations= reservations.filter(r=>r.isIndividual==false)
            setreservationsRender([...filterdReservations])
        }
        if(filterChanel=='SESSION')filterSession()
        if(filterChanel=='SUBJECT')filterSubject()
        if(filterChanel=='PACK')filterPack()
    }

    const filterLabel = (channel)=>{
         if(channel=='SUBJECT')return subjects[subjectFilter]
         if(channel=='PACK')return packs[pack]
         if(channel=='SESSION')return sessionTypes[sessionType]
    }

    return <View style={styles.filter}>
        <Text style={{color:colors.black,marginRight:8}}>Filter :</Text>
        <TouchableWithoutFeedback onPress={()=>filterRservations('PACK')}>
              <View style={styles.filterBtn}>
                  <Text style={{color:'#fff'}}>{filterLabel('PACK')} </Text>
              </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>filterRservations('SESSION')}>
              <View style={styles.filterBtn}>
                  <Text style={{color:'#fff'}}>{filterLabel('SESSION')} </Text>
              </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=>filterRservations('SUBJECT')}>
              <View style={styles.filterBtn}>
                  <Text style={{color:'#fff'}}>{filterLabel('SUBJECT')} </Text>
              </View>
        </TouchableWithoutFeedback>
     </View>
}
const styles =StyleSheet.create({
    btn:{
        padding:8,
        backgroundColor:'#fff',
        flexDirection:'row',
        borderRadius:12,
        alignItems:'center',
        marginRight:8,
        elevation:5,
        marginBottom:8
    },
    filterBtn:{
        paddingHorizontal:8,
        paddingVertical:4,
        backgroundColor:colors.colors[2],
        borderRadius:12 ,
        marginRight:4,
        marginBottom:4
    },
    filter:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        width:'100%',
        paddingVertical:8
    }
})

export default Filter
