import { createStore } from './store'
import uuidV4 from 'uuid/v4'

const {store, useStore} = createStore({})

const deleteMap = (map, key) => {
  const newMap = { ...map }
  delete newMap[key]
  return newMap
}

export const useNotifications = () => {
  const [notificationMap, setStore] = useStore()

  const addNotification = (notification, timeout) => {
    const uuid = uuidV4()

    setStore({
      ...store.state,
      [uuid]: notification
    })

    if (timeout) {
      setTimeout(() => {
        setStore(deleteMap(store.state, uuid))
      }, 5000)
    }
  }

  const notifications = Object.values(notificationMap)

  return {
    notifications,
    addNotification
  }
}