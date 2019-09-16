// Actions

const NAVIGATE = 'FANCY_NAVIGATE'
const GO_BACK = 'FANCY_GO_BACK'
export const CLOSE_APP = 'FANCY_CLOSE_APP'

const navigate = (routeName) => ({ type: NAVIGATE, payload: { routeName } })
const goBack = () => ({ type: GO_BACK, payload: {} })
const closeApp = () => ({ type: CLOSE_APP, payload: {} })

export const actions = {
  navigate,
  goBack,
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
  const history = state.routeHistory || []

  if (type === NAVIGATE) {
    const { routeName } = payload
    if (routeName !== state.currentRoute) {
      return {
        ...state,
        currentRoute: routeName,
        routeHistory: push(history, state.currentRoute)
      }
    }
  }

  if (type === GO_BACK) {
    const [backToRoute, newHistory] = pop(history)
    if (!backToRoute) {
      // This is handled by a RN specific reducer to keep
      // this reducer decoupled from RN.
      return function (dispatch) {
        dispatch(closeApp())
      }
    } else {
      return {
        ...state,
        currentRoute: backToRoute,
        routeHistory: newHistory
      }
    }
  }
  
  return state
}
