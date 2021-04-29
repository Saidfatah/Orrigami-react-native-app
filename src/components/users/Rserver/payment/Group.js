import React from 'react'
import { View } from 'react-native'
import GroupComp from '../../../Course/Groups/Group'
import Plan from './Plan'

const Group=({group})=>{
    return <View style={{height:150}}>
       <GroupComp group={group} />
       <Plan title={'Group pack'}  price={500} touchable={false} />
    </View>
 }

export default Group
