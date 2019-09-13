import React from 'react'
import { useEffect, useReducer, useRef } from 'react'

// Util functions
const hasProp = Object.prototype.hasOwnProperty

const setInitial = (store, routes) => {
  for (const route in routes) {
    if (routes[route].initial) {
      store.dispatch(navigate(route))
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

// State actions and reducer

const NAVIGATE = 'FANCY_NAVIGATE'

function navigate (routeName) {
  return { type: NAVIGATE, payload: { routeName } }
}

const GO_BACK = 'FANCY_GO_BACK'

function goBack () {
  return { type: GO_BACK, payload: {} }
}

export const actions = {
  navigate,
  goBack
}

export function fancyNavigationReducer (action, state) {
  const { type, payload } = action
  const prevRoutes = state.routeHistory || []

  if (type === NAVIGATE) {
    const { routeName } = payload
    if (routeName !== state.currentRoute) {
      return {
        ...state,
        currentRoute: routeName,
        routeHistory: prevRoutes.concat([state.currentRoute])
      }
    }
  }

  if (type === GO_BACK) {
    const backToRoute = [...prevRoutes].pop()
    console.log('GO_BACK', { backToRoute, prevRoutes })
    if (!backToRoute) {
      console.log('CLOSE APP')
    } else {
      return {
        ...state,
        currentRoute: backToRoute,
        routeHistory: prevRoutes
      }
    }
  }
  
  return state
}


// Create Native Router
export function createNativeRouter (store, routes) {
  const NativeRouter = () => {
    const currentRoute = useCurrentRoute(store)
    const route = currentRoute || setInitial(store, routes)
    const Component = findComponent(routes, route)

    if (!Component) {
      console.warn(`No Component found for route: ${route}`)
    }

    console.log('NativeRouter', { route, Component })

    return <Component />
  }
  return NativeRouter
}

// Hook to sync currentRoute from store
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
