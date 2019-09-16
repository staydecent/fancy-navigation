import { useEffect, useReducer, useRef } from 'react'

// Hook to sync currentRoute from store
export function useCurrentRoute (store) {
  const [, forceRender] = useReducer(n => n + 1, 0)

  const routeRef = useRef()
  const historyRef = useRef()

  useEffect(() => {
    function handleStateChange () {
      const nextRoute = store.getState().currentRoute
      const history = store.getState().routeHistory
      if (nextRoute !== routeRef.current) {
        routeRef.current = nextRoute
        historyRef.current = history
        forceRender({})
      }
    }

    const unsubscribe = store.subscribe(handleStateChange)
    handleStateChange()

    return () => unsubscribe()
  }, [store])

  return [routeRef.current, historyRef.current]
}
