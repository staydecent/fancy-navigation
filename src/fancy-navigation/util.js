import { actions } from './state'

const hasProp = Object.prototype.hasOwnProperty

export const setInitial = (store, routes) => {
  const noRouteYet = store.getState().currentRoute == null
  for (const route in routes) {
    if (routes[route].initial) {
      noRouteYet && store.dispatch(actions.navigate(route))
      return route
    }
  }
  throw new Error('You must declare one of your top-level routes at `initial = true`.')
}

export const findComponent = (routes, currentRoute) => {
  for (const route in routes) {
    if (hasProp.call(routes[route], 'routes')) {
      const shouldRender = Object
        .keys(routes[route].routes)
        .some(routeName => routeName === currentRoute)
      if (shouldRender) {
        const Component = routes[route].component
        return [Component, routes[route].routes]
      }
    } else {
      const foundRoute = route === currentRoute
      if (foundRoute) {
        const Component = routes[route].component
        return [Component, null]
      }
    }
  }
  return [null, null]
}

const arrayFromStack = stack => {
  const array = []
  for (const elem of stack) {
    array.push(elem)
  }
  return array
}
