import React from 'react'
import { BackHandler, View } from 'react-native'

import { useCurrentRoute } from './use-current-route'
import { setInitial, findComponent } from './util'
import { CLOSE_APP } from './state'

const screenStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'white'
}

const ScreenWrapper = ({ children }) => {
  return (
    <View style={screenStyle}>{children}</View>
  )
}

// Create Native Router
export function createNativeRouter (store, routes) {
  const NativeRouter = () => {
    const [currentRoute, history] = useCurrentRoute(store)
    const route = currentRoute || setInitial(store, routes)
    const Component = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    const backComponents = (history || []).map(route => [route, findComponent(routes, route)])
    const components = backComponents.concat([[route, Component]])
    console.log({ components })

    return (
      <React.Fragment>
        {components.map(([route, Component]) =>
          <ScreenWrapper key={route}>
            <Component />
          </ScreenWrapper>
        )}
      </React.Fragment>
    )
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
