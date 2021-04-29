import React,{useEffect,useState} from 'react'
import Pdf from 'react-native-pdf';
import {View} from 'react-native'
import Loading from '../../wrrapersAndElems/Loading'

const  PDFReader =({route,navigation})=> {
    const [loading, setloading] = useState(true)

    useEffect(() => {
        if(route.params.filename !== undefined) 
             navigation.setOptions({title:route.params.filename})
    }, [])


    if(route.params.url == undefined) 
       return <View />


    const source = {
        uri:route.params.url,
        cache:true
    };
    return  <View >
        {loading
        ?<View  style={{alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Loading /> 
         </View>
        : <View/>
        }
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages,filePath)=>{ setloading(false)}}
          onPageChanged={(page,numberOfPages)=>{console.log(`current page: ${page}`)}}
          onError={(error)=>{console.log(error)}}
          onPressLink={(uri)=>{console.log(`Link presse: ${uri}`)}}
          style={{height:loading?0:'100%',width:'100%'}}
       />
    </View>
}

export default PDFReader
