import { View, Text } from 'react-native'
import Txt from './Txt/txt'
import React from 'react'

const Loading = () => {
  return (
    <View style={{justifyContent:'center', alignItems: 'center', flex: 1}}>
      <Txt>Loading...</Txt>
    </View>
  )
}

export default Loading