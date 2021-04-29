import React,{useContext,useState,useEffect} from 'react'
import {StyleSheet,View,TouchableNativeFeedback,Text,TextInput} from 'react-native'
import {colors} from '../../../../styles/variables'
import Icon from 'react-native-vector-icons/Ionicons'
import Gradiant from '../../../wrrapersAndElems/GradiantWrraper'
import {ReservationContext} from '../../../../Context/Rservation'
import {Dimensions,StatusBar} from 'react-native'
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view'

const wheight = Dimensions.get('window').height
const stautsHeihgt = StatusBar.currentHeight


const  Individual =({navigation})=> {
    const {setindex,handelChange,settopicContext}=useContext(ReservationContext)
    const [subjects, setsubjects] = useState([
        {title:'Francais',category:'Language'},
        {title:'Arab',category:'Language'},
        {title:'Francais',category:'Language'},
        {title:'Physic',category:'science'},
        {title:'Biology',category:'science'},
        {title:'math',category:'science'},
        {title:'Java',category:'computer'},
    ])
    const [subjectsToRender, setsubjectsToRender]=useState(subjects)
    const [category, setcategory] = useState(0)
    const [filter, setfilter] = useState(false)
    const [check, setcheck] = useState([])
    const [topic, settopic] = useState('')
    const [nextBtn, setnextBtn] = useState(false)
    
    useEffect(() => {
        handelChange('group')(null);
        handelChange('subject')(subjects[0].title);
        filterCateg()
        setcheck(subjects.map((s,i)=>i!=0?false:true))
    }, [filter])
    useEffect(() => {
        console.log('nextBtn'+nextBtn)
    }, [nextBtn])
    const choseSubject =(s,i)=>{
        let checked = [...check];
        checked = checked.map(c=>false);
        checked[i]=true;
        setcheck([...checked]);
        console.log(subjects[i].title);
        handelChange('subject')(subjects[i].title);
    }
    const filterCateg =()=>{
        if(category==NaN)setcategory(0)
        if(category==3)setcategory(0)
        else setcategory(category+1)
        console.log(category)
        let categoryText
        if(category==0) return setsubjectsToRender(subjects)
        if(category==1)categoryText ='Language'
        if(category==2)categoryText ='science'
        if(category==3)categoryText ='computer'
        const filterd= subjects.filter(s=>s.category==categoryText)
        console.log(categoryText)
        setsubjectsToRender([...filterd])
    }
    const filterLabel = ()=>{
        if(category==0) return 'computer'
        if(category==1) return 'All'
        if(category==2) return 'Language'
        if(category==3) return 'science'
    }
    const next=()=>
    {      
        settopicContext(topic);
        setindex(3);
        navigation.navigate('Payment');
    }
    return (
      <KeyboardAwareScrollView   >
        <Gradiant style={styles.gradiant}>
        <View style={styles.Individual}>
               <Text style={styles.Title}>Titre </Text>
              <TextInput 
               style={styles.Input}  
               placeholder="Titre du reservation " 
               textContentType='addressCity'
               onChange={e => {    
                   const { text} = e.nativeEvent;
                   settopic(text)
               }} 
               onBlur={e=>{
                   if(topic!='')setnextBtn(true)
               }}
               value={topic} 
               />
              <Text style={styles.Title}>Choisir Les matiers</Text>
              <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Text style={{color:'#fff',marginRight:8}}>filter</Text>
                    <TouchableNativeFeedback onPress={e=>filterCateg()}>
                        <View style={styles.rc}>
                            <Text style={styles.filterLabel}>{filterLabel()}</Text> 
                        </View>
                     </TouchableNativeFeedback>
              </View>
              <View style={{flexDirection:"row",flexWrap:'wrap'}}>
                  {
                      subjectsToRender.map((s,i)=>(
                      <TouchableNativeFeedback key={i} onPress={()=>{choseSubject(s,i)}}>
                        <View style={styles.subject}>
                            <Text> {s.title} </Text>
                            <Icon name={check[i]?"checkmark-circle":"checkmark-circle-outline"} size={20} color={colors.colors[2]} />
                        </View>
                    </TouchableNativeFeedback>)
                    )
                  }
              </View>
              
             <TouchableNativeFeedback disabled={!nextBtn}  onPress={e=>next()}>
                    <View  style={{...styles.btn,opacity:topic!=''?1:.8}}>
                         <Text style={styles.text}>Payment</Text>
                         <Icon name='arrow-forward'  style={{...styles.icon,  marginLeft:16}}/>
                    </View>
             </TouchableNativeFeedback>
        
        </View>
        </Gradiant>
      </KeyboardAwareScrollView>
    )
}

var styles = StyleSheet.create({
    gradiant:{
        height:wheight -50 -stautsHeihgt,
        justifyContent:'center',
        padding:16,
        backgroundColor:'red'
    },
    Individual:{
 
    },
    Title:{
       fontSize:25,
       textAlign:'center',
       color:'#fff',
    },
    Input:{
        padding:8 ,
        color:colors.black,
        backgroundColor:'#fff',
        width:'100%',
        height:50,
        borderRadius:12,
        marginBottom:8,
    },
    icon:{
       fontSize:20,
       marginRight:16,
       color:colors.black
    },
    text:{
       fontSize:20,
       color:colors.black
    },
    btn:{
       width:'100%',
       backgroundColor:'#fff',
       padding:16,
       borderRadius:50,
       marginBottom:8,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center'
    },
    subject:{
       backgroundColor:'#fff',
       padding:8,
       borderRadius:50,
       marginBottom:8,
       flexDirection:'row',
       width:100,
       margin:2,
 
      },
    rc:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center'
     },
    filterLabel:{color:colors.black,
    backgroundColor:'#fff',
    borderRadius:50,
    textAlign:'center',
    marginBottom:8,
    padding:4,
    paddingHorizontal:10
    },
});
export default Individual