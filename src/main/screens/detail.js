import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { dispatch, goBack } from '/store'

export function DetailScreen () {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}>
      <Text>Detail Screen</Text>
      <TouchableOpacity onPress={() => dispatch(goBack())}>
        <Text>Go Back!</Text>
      </TouchableOpacity>
    </View>
  )
}
