import React from 'react'
import { useEffect, useReducer, useRef } from 'react'

const hasProp = Object.prototype.hasOwnProperty

const findInitial = (routes) => {
  for (const route in routes) {
    if (routes[route].initial) {
      return route
    }
  }
  throw new Error('You must declare one of your top-level routes at `initial = true`.')
}

const findComponent = (routes, currentRoute) => {
  for (const route in routes) {
    if (hasProp.call(routes[route], 'routes')) {
      const shouldRender = Object
        .keys(routes[route].routes)
        .some(routeName => routeName === currentRoute)
      if (shouldRender) {
        const Component = routes[route].component
        return Component
      }
    } else {
      const foundRoute = route === currentRoute
      if (foundRoute) {
        // if (foundRoute !== currentRoute) {
        //   storeRef.setState({ currentRoute: newRoute })
        // }
        const Component = routes[route].component
        return Component
      }
    }
  }
}

export function createNativeRouter (store, routes) {
  const NativeRouter = () => {
    const currentRoute = useCurrentRoute(store)
    const route = currentRoute || findInitial(routes)
    const Component = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    console.log('NativeRouter', { route, Component })

    return <Component />
  }
  return NativeRouter
}

function useCurrentRoute (store) {
  const [, forceRender] = useReducer(n => n + 1, 0)

  const routeRef = useRef()

  useEffect(() => {
    function handleStateChange () {
      const nextRoute = store.getState().currentRoute
      if (nextRoute !== routeRef.current) {
        routeRef.current = nextRoute
        forceRender({})
        console.log({ nextRoute })
      }
    }

    const unsubscribe = store.subscribe(handleStateChange)
    handleStateChange()

    return () => unsubscribe()
  }, [store])

  return routeRef.current
}
