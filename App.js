import React from 'react'
import { StatusBar } from 'react-native'

import store from '/store'
import { createNativeRouter } from '/fancy-navigation'

// import Main, { routes as mainRoutes } from '/main'
// import Dashboard, { routes as dashboardRoutes } from '/dashboard'

import { HomeScreen } from '/main/screens/home'
import { DetailScreen } from '/main/screens/detail'

// We create a React Native compatible view, passing all of the routes
// in at invocation so we don't need to wait on the React tree to render
// to register all of the routes definitions.
// const AppRouter = createNativeRouter(
//   {
//     Main: {
//       routes: mainRoutes,
//       component: Main,
//       initial: true
//     },
//     Dashboard: {
//       routes: dashboardRoutes,
//       component: Dashboard
//     }
//   }
// )

const AppRouter = createNativeRouter(
  store,
  {
    Home: {
      component: HomeScreen,
      initial: true
    },
    Detail: {
      component: DetailScreen
    }
  }
)

export function App () {
  return (
    <React.Fragment>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' animated />
      <AppRouter />
    </React.Fragment>
  )
}
