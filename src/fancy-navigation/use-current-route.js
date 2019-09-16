import { useEffect, useReducer, useRef } from 'react'

// Hook to sync currentRoute from store
export function useCurrentRoute (store) {
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
