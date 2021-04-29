import React,{useState,useEffect} from 'react'
import {StyleSheet,Text, FlatList,TouchableOpacity,View} from 'react-native'
import {colors} from '../../../styles/variables'
import remoteConfig from '@react-native-firebase/remote-config';
import Icon from 'react-native-vector-icons/AntDesign'
import docs from './docs'
import Gradiant from '../../wrrapersAndElems/GradiantWrraper'

const  Documents= ({navigation})=> {
    const [categs,setCategs]=useState([])
    const [categsToRender, setcategsToRender] = useState([])
    const [activatedRemote, setactivatedRemote] = useState(false)
    const [nodesHistory, setnodesHistory] = useState([])



    useEffect(() => { 
           remoteConfig()
          .setDefaults({ docs: {}})
          .then(() => remoteConfig().fetchAndActivate())
          .then(fetchedRemotely => {
              if (fetchedRemotely) setactivatedRemote(true) 
              else console.log('No configs were fetched from the backend, and the local configs were already activated');
              if(categs.length <1  )
              {
                  console.log('get values')
                 const res= remoteConfig().getValue('docs')     
                 if(res._value){
                      
                       const resToJson = JSON.parse(res._value)
                       const arrFromJson = Object.values(resToJson.categs)
                       console.log(arrFromJson)
                       setCategs(arrFromJson)
                       setcategsToRender(arrFromJson)
                  }
              //    setCategs(docs)
              //    setcategsToRender(docs)
              }
           
          });
    }, [])

    useEffect(() => {
         if(categs.length <1)return ;
         let selectedCategs;
         if(nodesHistory.length<1) return ;
         selectedCategs = getNodeChilderns() ;
         if(selectedCategs[0] != undefined)
         {
            setcategsToRender(selectedCategs)
         }
    }, [nodesHistory.length])


    const getNodeChilderns = ()=>{
        return nodesHistory.reduce((a,c)=>{
             const {currentType,title,childernType}=c;
             const hasProperty =  [...a].filter(n=> n.hasOwnProperty(currentType));
             const typeEqualsValues = [...hasProperty].filter(n=>n[currentType] == title)[0];
             if(typeEqualsValues == undefined) return a 
             return typeEqualsValues[childernType]
        },[...categs])
    }
    
    const Categ =({item})=>{
        let title ="node title"
        let childernType ;
        let currentType ;
        let hasChildern=false ; 
        
        if(item.hasOwnProperty('url')) {
            title =item.name
        }
        else {
            if(item.hasOwnProperty('docs')) {
                if(item.hasOwnProperty('subSubCateg')){
                    title=item.subSubCateg
                    currentType='subSubCateg'
                }
                if(item.hasOwnProperty('subCateg')){
                    title=item.subCateg
                    currentType='subCateg'
                }
                if(item.hasOwnProperty('categ')){
                    title=item.categ
                    currentType='categ'
                }
                childernType ='docs'
                hasChildern=true 
            }
            else{
                if(item.hasOwnProperty('subCategs')){
                     title=item.categ
                     hasChildern=true
                     currentType='categ'
                     childernType='subCategs'
                }
                if(item.hasOwnProperty('subSubCategs')){ 
                     title=item.subCateg
                     hasChildern=true
                     currentType='subCateg'
                     childernType='subSubCategs'
                }  
            }
        }
        
        const next =()=>{
              if(hasChildern && childernType != undefined){
                 let nodesHistorySpread= [...nodesHistory]
                 nodesHistorySpread.push({currentType,title,childernType})
                 setnodesHistory([...nodesHistorySpread])
                 if(childernType =='docs')
                  {
                      console.log({currentType,title,childernType})
                    let docs 
                    if(nodesHistory.length<1)
                        docs = categs.filter(c=>c.hasOwnProperty('docs') && c.categ == title)[0]
                    if(docs)return setcategsToRender(docs.docs)
                    console.log('aint got docs')
                 }   
              }else 
              {
                 const docUrl = item.hasOwnProperty('url')
                 const split= item['url'].split('/')
                 const lastPartOfUrl =split[split.length-1]
                 const extension  =lastPartOfUrl.split('.')[1]
                 if(extension && extension=='pdf')
                  navigation.navigate('pdf',{url:item['url'],filename:title})
                
              }
        }

        return  <TouchableOpacity  onPress={e=>next()}>
             <View style={styles.categ}>
               <Text style={{color:colors.black}}>{title}</Text>
             </View>
       </TouchableOpacity>

    }
    const Back =()=>{
        const back=()=>{
            if(nodesHistory.length <=1) setcategsToRender([...categs])
            let nodesHistorySpread= [...nodesHistory]
            nodesHistorySpread.pop()
            setnodesHistory([...nodesHistorySpread])
        }
        if(nodesHistory.length>0)
             return <TouchableOpacity onPress={()=>back()} >
                  <View style={styles.backBtn} >
                      <Icon name="back" />
                      <Text style={{marginLeft:8}}  >Back</Text>
                  </View>
             </TouchableOpacity>
        else return <View />
    }

    return (
        <View style={ {padding:16}} >        
            <FlatList 
                  contentContainerStyle={props =>(styles.flatList)}
                  showsVerticalScrollIndicator={false}
                  data={categsToRender}
                  renderItem={({ item }) =><Categ item={item} />}
                  keyExtractor={(item, index) => index.toString()}
             />
             <Back />
        </View>
    )
}

var styles = StyleSheet.create({
    categs:{
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flatList:{ 
        width:'100%'
    },
    wrapper:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    categ:{
        width:'100%',
        marginBottom:8,
        padding:8,
        borderRadius:12,
        backgroundColor:'#fff'
    },
    backBtn:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        elevation:5,
        padding:8,
        width:100,
        borderRadius:12
    },
    title:{
        fontSize:32,
        color:colors.black
    },
    categName:{
        color:colors.black,
        fontSize:20
    },
    img:{
        marginTop:20,
        width:50,
        height:50
    },
 });
export default Documents
