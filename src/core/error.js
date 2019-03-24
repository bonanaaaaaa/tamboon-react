import { createStore } from './store'
import uuidV4 from 'uuid/v4'

const {store, useStore} = createStore({})

const deleteMap = (map, key) => {
  const newMap = { ...map }
  delete newMap[key]
  return newMap
}

export const useError = () => {
  const [errorMap, setStore] = useStore()

  const addError = (error, timeout) => {
    const uuid = uuidV4()

    setStore({
      ...store.state,
      [uuid]: error
    })

    if (timeout) {
      setTimeout(() => {
        setStore(deleteMap(store.state, uuid))
      }, 5000)
    }
  }

  const errors = Object.values(errorMap)

  return {
    errors,
    addError
  }
}