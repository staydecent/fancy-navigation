import { useEffect, useReducer, useRef } from 'react'

// Hook to sync currentRoute from store
export function useCurrentRoute (store) {
  const [, forceRender] = useReducer(n => n + 1, 0)

  const stateRef = useRef({})

  useEffect(() => {
    function handleStateChange () {
      const prev = stateRef.current
      const {
        currentRoute,
        routeStack,
        backToRoute,
        nextRouteStack
      } = store.getState()

      if (currentRoute !== prev.currentRoute || backToRoute !== prev.backToRoute) {
        stateRef.current = {
          currentRoute,
          routeStack,
          backToRoute,
          nextRouteStack
        }

        forceRender({})
      }
    }

    const unsubscribe = store.subscribe(handleStateChange)
    handleStateChange()

    return () => unsubscribe()
  }, [store])

  // {
  //   currentRoute,
  //   routeStack,
  //   nextRouteStack
  // }
  return stateRef.current
}
