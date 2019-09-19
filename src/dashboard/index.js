import React from 'react'
import { View } from 'react-native'
import { UsersScreen } from './screens/users'
import { UserScreen } from './screens/user'

import { Header } from './header'

export const routes = {
  Users: {
    component: UsersScreen,
    initial: true
  },
  User: {
    component: UserScreen
  }
}

const screenStyle = {
  height: '100%'
}

export function Dashboard ({ Router }) {
  return (
    <View style={screenStyle}>
      <Header />
      <Router offset={70} noAnimation />
    </View>
  )
}
