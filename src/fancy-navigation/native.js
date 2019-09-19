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

const ScreenWrapper = ({
    route,
    backToRoute,
    focused,
    cleanup,
    offset = 0,
    noAnimation = false,
    children
  }) => {
  const opacity = useRef(new Animated.Value(noAnimation ? 1 : 0)).current
  const top = useRef(new Animated.Value(noAnimation ? offset : 100)).current

  // Fade-in
  useEffect(() => {
    !noAnimation && Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 150 }),
      Animated.timing(top, { toValue: offset, duration: 150 })
    ]).start()
  }, [])

  // Fade-out, then unmount
  useEffect(() => {
    if (!noAnimation && focused && backToRoute && backToRoute !== route) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 100 }),
        Animated.timing(top, { toValue: offset + 50, duration: 100 })
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
  // When a ScreenWrapper is done animating, it calls this function
  // to move the next route and stack values along.
  const updateRouteStack = () => setTimeout(() => store.dispatch(actions.updateStack()), 250)

  // This is our Native Router Component!
  const NativeRouter = ({ offset, noAnimation }) => {
    const {
      currentRoute,
      routeStack,
      backToRoute,
      nextRouteStack,
      routeParams
    } = useCurrentRoute(store)
    const route = currentRoute || setInitial(store, routes)
    // If the found Component has nested routes, pass down a Router to render
    const [Component, childRoutes] = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    const len = (routeStack || []).length
    const components = []
    for (let x = 0; x < len; x++) {
      const foundComponent = findComponent(routes, routeStack[x])[0]
      if (foundComponent) {
        components.push([routeStack[x], foundComponent])
      }
    }

    components.push([route, Component])

    return (
      <React.Fragment>
        {components.map(([route, Component]) =>
          <ScreenWrapper
            key={route}
            route={route}
            backToRoute={backToRoute}
            cleanup={updateRouteStack}
            focused={route === currentRoute}
            offset={offset}
            noAnimation={noAnimation}
          >
            <Component
              Router={childRoutes && createNativeRouter(store, childRoutes)}
              {...routeParams || {}}
            />
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
