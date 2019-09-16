import React from 'react'
import { BackHandler } from 'react-native'

import { useCurrentRoute } from './use-current-route'
import { setInitial, findComponent } from './util'
import { CLOSE_APP } from './state'

// Create Native Router
export function createNativeRouter (store, routes) {
  const NativeRouter = () => {
    const currentRoute = useCurrentRoute(store)
    const route = currentRoute || setInitial(store, routes)
    const Component = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    return <Component />
  }
  return NativeRouter
}

// Native exit app reducer
export function androidExitReducer (action, state) {
  const { type } = action
  if (type === CLOSE_APP) {
    BackHandler.exitApp()
  }
  return state
}
