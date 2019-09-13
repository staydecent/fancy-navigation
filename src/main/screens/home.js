import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { dispatch, set } from '/store'

export function HomeScreen () {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => dispatch(set('currentRoute', 'Detail'))}>
        <Text>Goto Detail</Text>
      </TouchableOpacity>
    </View>
  )
}
