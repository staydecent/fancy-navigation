import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRequest } from '@app-elements/use-request'

import store, { dispatch, navigate } from '/store'

const UserDetails = ({ id, name, email }) =>
  <View>
    <Text>{name}</Text>
    <Text>{email}</Text>
    <TouchableOpacity><Text>&larr; Back to all Users</Text></TouchableOpacity>
  </View>

export function UserScreen ({ id, ...props }) {
  const { result, isLoading } = useRequest(store, `https://jsonplaceholder.typicode.com/users/${id}`)
  return (
    <View>
      {isLoading
        ? <Text>USER???..</Text>
        : (
          <React.Fragment>
            <UserDetails {...result} />
            {parseInt(id, 10) < 10 &&
              <TouchableOpacity><Text>Next</Text></TouchableOpacity>
            }            
          </React.Fragment>
        )}
    </View>
  )
}

