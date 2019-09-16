// Actions

const NAVIGATE = 'FANCY_NAVIGATE'
const GO_BACK = 'FANCY_GO_BACK'
const UPDATE_STACK = 'FANCY_UPDATE_STACK'
export const CLOSE_APP = 'FANCY_CLOSE_APP'

const navigate = (routeName) => ({ type: NAVIGATE, payload: { routeName } })
const goBack = () => ({ type: GO_BACK, payload: {} })
const updateStack = () => ({ type: UPDATE_STACK, payload: {} })
const closeApp = () => ({ type: CLOSE_APP, payload: {} })

export const actions = {
  navigate,
  goBack,
  updateStack,
  closeApp
}

// Reducer

const push = (array, value) => {
  if (!value) return array
  array[array.length] = value
  return array
}

const pop = (array) => {
  const idx = array.length - 1
  const value = array[idx]
  return [value, array.slice(0, idx)]
}

export function fancyNavigationReducer (action, state) {
  const { type, payload } = action
  const history = state.routeStack || []

  if (type === NAVIGATE) {
    const { routeName } = payload
    if (routeName !== state.currentRoute) {
      return {
        ...state,
        currentRoute: routeName,
        routeStack: push(history, state.currentRoute)
      }
    }
  }

  if (type === GO_BACK) {
    const [backToRoute, nextRouteStack] = pop(history)
    if (!backToRoute) {
      // This is handled by a RN specific reducer to keep
      // this reducer decoupled from RN.
      return function (dispatch) {
        dispatch(closeApp())
      }
    } else {
      // We don't replace/update the `routeStack` array,
      // But we set what it should be set to next, and our
      // `ScreenWrapper` components will handle when to update
      // the `routeStack` so they have time to animate.
      return {
        ...state,
        nextRouteStack,
        backToRoute
      }
    }
  }

  if (type === UPDATE_STACK) {
    const { nextRouteStack, backToRoute } = state
    return {
      ...state,
      backToRoute: null,
      nextRouteStack: null,
      routeStack: nextRouteStack,
      currentRoute: backToRoute
    }
  }
  
  return state
}
