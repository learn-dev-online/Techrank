import { View, TextInput } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather';

export default function SeachBox() {
  return (
    <View
          style={{
            flexDirection: 'row',
            // borderColor: '#C6C6C6',
            borderColor:'#6c47ff',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 8,
            alignItems:'center'
          }}>
          <Feather
            name="search"
            size={20}
            color="#C6C6C6"
            style={{marginRight: 5}}
          />
          <TextInput placeholder="Search" style={{width:"100%"}}/>
        </View>
  )
}