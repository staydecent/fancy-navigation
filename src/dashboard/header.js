import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

// TODO: Move to atom project
import { useMappedState } from '@app-elements/use-mapped-state'
import store, { dispatch, goBack } from '/store'

const wrapperStyle = {
  height: 70,
  backgroundColor: '#eee',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  elevation: 1
}

export function Header () {
  const { routeStack } = useMappedState(store, ({ routeStack }) => ({ routeStack }))
  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={() => dispatch(goBack())}>
        <Text>Back</Text>
      </TouchableOpacity>
      <Text>Logo</Text>
      <View />
    </View>
  )
}
