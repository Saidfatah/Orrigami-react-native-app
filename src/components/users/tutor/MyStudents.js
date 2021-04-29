import React,{useState,useEffect,useCallback,useContext} from 'react'
import {StyleSheet,View,Text,} from 'react-native'
import {getTutorPlanningsIndividual} from '../../../FireBase/firebase'
import {colors} from '../../../styles/variables'
import {AccordionList} from 'accordion-collapse-react-native'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'
import {AuthContext} from '../../../Context/AuthProvider'
import _ from 'lodash'


const MyStudents=()=> {
    const {user} = useContext(AuthContext)
    const [plans, setplans] = useState([])

    const fetchMyAPI = useCallback(async () => {
        let res = await getTutorPlanningsIndividual(user.id)
        if(res.docs[0] != undefined ){
            
            //group pllanings by username 
            const arr=  res.docs.map(p=>(p._data))
            var grouped = _.mapValues(_.groupBy(arr, 'student_name'),
            cl => cl.map(p=>_.omit(p, 'student_name')));

            //convert thegroupedObj to array 
            var result = Object.keys(grouped).map(key=>({name:key,plannings:grouped[key]}) );
            setplans(result.map(student=>(
                {
                 name:student.name,
                 plannings:student.plannings,
                 sessions:student.plannings.length,
                }
            )))
        }
      }, [])

    useEffect(() => {
        if(plans.length<1)fetchMyAPI()
    }, [plans.length])

    const Plan=({plan})=>{
        const {time,topic}=plan
            return (
            <View  style={{...styles.plan}}>
                <Text style={{ color:colors.colors[2],marginRight:16}}>{topic}</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginRight:16}}>
                    <Text style={{color:colors.black}}>{time.start}</Text>
                    <Text style={{color:colors.black}}> to </Text>
                    <Text style={{color:colors.black}}>{time.end}</Text>
                </View>
            </View>
           )
    } 

    const Header=({item,exp})=>{
        const styleRefactord = { ...styles.studentHeader,
            borderBottomLeftRadius:!exp?12:0,
            borderBottomRightRadius:!exp?12:0,
            marginBottom:!exp?8:0,
            }
        return <Gradiant  style={styleRefactord} >
                  <Text style={{color:'#fff'}}>{item.name}</Text>
                   <View style={styles.sessions}>
                       <Text style={{color:'#fff'}}>{item.sessions} sessions</Text>
                    </View>
        </Gradiant>
    }

    const Body =({item})=>{
         return <Gradiant   style={styles.body} >       
                {item.plannings.map((p,i)=><Plan 
                    key={i}
                    plan={{
                    topic:p.topic , 
                    time:{
                        start:p.time.start, 
                        end:p.time.end,
                        date:p.time.date
                        } 
                    }} />
                )}
             </Gradiant>
    }


    return (
        <View style={{padding:16}}>
             <AccordionList
               list={plans}
               header={(item,i,exp) =><Header key={i} {...{item,exp}} />}
               onToggle={(item,index, isExpanded)=>console.log(index)}
               body={(item,i,exp) =><Body key={i} item={item} />}
               keyExtractor={(item,index) => 'index'+index}
             />
        </View>
    )
}

const styles =StyleSheet.create({
    plan:{
    paddingHorizontal:8,
    paddingVertical:4,
    backgroundColor:colors.colors[2],
    borderRadius:25,
    flexDirection:'row',
    margin:4,
    alignItems:'center'
    },
    studentHeader:{
        padding:8,
        backgroundColor:'#fff',
        borderRadius:12,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
     
    },
    body:{
        padding:8,
        marginBottom:8,
        borderRadius:12,
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
    },
    plan:{
        backgroundColor:'#fff',
        borderRadius:10,
        padding:8,
        marginBottom:8
    },
    sessions:{
        paddingHorizontal:8,
        backgroundColor:colors.red,
        borderRadius:25
    },
})
export default MyStudents
