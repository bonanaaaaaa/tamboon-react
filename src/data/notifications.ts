import uuidV4 from 'uuid/v4'

import { createStore } from '../core/store'

import Notification from '../types/notification'

type NotificationMap = {
  [key: string]: Notification
}

const {useStore} = createStore<NotificationMap>({})

const deleteMap = (map, key) => {
  const newMap = { ...map }
  delete newMap[key]
  return newMap
}

let notificationState

export const useNotifications = () => {
  const [notificationMap, setStore] = useStore()

  notificationState = notificationMap

  const addNotification = (notification, timeout) => {
    const uuid = uuidV4()

    setStore({
      ...notificationState,
      [uuid]: notification
    })

    if (timeout) {
      setTimeout(() => {
        setStore(deleteMap(notificationMap, uuid))
      }, 5000)
    }
  }

  const notifications = Object.values(notificationMap)

  return {
    notifications,
    addNotification
  }
}