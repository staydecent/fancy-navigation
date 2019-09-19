import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRequest } from '@app-elements/use-request'

import store, { dispatch, navigate } from '/store'

const UserItem = ({ id, name, email }) =>
  <View style={{ marginVertical: 10 }}>
    <TouchableOpacity onPress={() => dispatch(navigate('User', { id }))}>
      <Text>{name}</Text>
    </TouchableOpacity>
    <Text>{email}</Text>
  </View>

export function UsersScreen () {
  const { result, isLoading, error } = useRequest(store, 'http://jsonplaceholder.typicode.com/users')
  return (
    <View>
      {isLoading
        ? <Text>Loading..</Text>
        : result && result.map(u => <UserItem key={u.email} {...u} />)}
    </View>
  )
}
