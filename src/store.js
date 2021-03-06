// This is our global store. Which is basically just a single, global JavaScript object,
// which is immutable. Meaning you cannot mutate the object directly, but instead must call
// `store.setState` or dispatch actions similar to redux.
import { createContext } from 'react'

import createStore from 'atom'
// import devtools from 'atom/devtools'

import pathReducer, { actions } from '@wasmuth/path-reducer'

import {
  fancyNavigationReducer,
  androidExitReducer,
  actions as fancyActions
} from '/fancy-navigation'

// Define the global state on page load.
export const initialState = {}

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = [
  pathReducer,
  fancyNavigationReducer,
  androidExitReducer,
  function logger (action, state) {
    console.log('[STORE]', { type: action.type, ...action.payload, state })
    return state
  }
]

const store = createStore(reducers, initialState)

export default store

export const getState = store.getState
export const setState = store.setState

export const set = actions.set
export const update = actions.update
export const remove = actions.remove
export const dispatch = store.dispatch

export const navigate = fancyActions.navigate
export const goBack = fancyActions.goBack

// This is a simple Provider to provide the store instance on the
// React Context, so any child Component can access it.
export const StoreContext = createContext(store)
