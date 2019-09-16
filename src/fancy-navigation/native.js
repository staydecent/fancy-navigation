import React, { useRef, useEffect } from 'react'
import { BackHandler, Animated } from 'react-native'

import { useCurrentRoute } from './use-current-route'
import { setInitial, findComponent } from './util'
import { CLOSE_APP, actions } from './state'

const screenStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'white'
}

const ScreenWrapper = ({ route, backToRoute, cleanup, children }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const top = useRef(new Animated.Value(100)).current

  // Fade-in
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 150 }),
      Animated.timing(top, { toValue: 0, duration: 150 })
    ]).start()
  }, [])

  // Fade-out, then unmount
  useEffect(() => {
    if (backToRoute && backToRoute !== route) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 150 }),
        Animated.timing(top, { toValue: 100, duration: 150 })
      ]).start(cleanup)
    }
  }, [backToRoute])

  const style = { ...screenStyle, opacity, top }

  return (
    <Animated.View style={style}>
      {children}
    </Animated.View>
  )
}

// Create Native Router
export function createNativeRouter (store, routes) {
  const updateRouteStack = nextRouteStack => (
    store.dispatch(actions.updateStack(nextRouteStack))
  )

  const NativeRouter = () => {
    const {
      currentRoute,
      routeStack,
      backToRoute,
      nextRouteStack
    } = useCurrentRoute(store)
    const route = currentRoute || setInitial(store, routes)
    const Component = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    const backComponents = (routeStack || []).map(route => [route, findComponent(routes, route)])
    const components = backComponents.concat([[route, Component]])

    console.log({
      backToRoute
    })

    return (
      <React.Fragment>
        {components.map(([route, Component]) =>
          <ScreenWrapper
            key={route}
            route={route}
            backToRoute={backToRoute}
            cleanup={updateRouteStack}
          >
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
