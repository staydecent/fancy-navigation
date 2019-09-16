import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { dispatch, navigate, goBack } from '/store'

export function HomeScreen () {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'pink' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => dispatch(navigate('Detail'))}>
        <Text>Goto Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(goBack())}>
        <Text>Go Back!</Text>
      </TouchableOpacity>
    </View>
  )
}
