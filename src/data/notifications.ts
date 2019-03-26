import uuidV4 from 'uuid/v4'

import { createStore } from '../core/store'

import Notification from '../types/notification'

interface NotificationMap {
  [key: string]: Notification
}

const { useStore } = createStore<NotificationMap>({})

const deleteMap = (map: NotificationMap, key: string) => {
  const newMap = { ...map }
  delete newMap[key]
  return newMap
}

let notificationState: NotificationMap

export const useNotifications = () => {
  const [notificationMap, setStore] = useStore()

  notificationState = notificationMap

  const addNotification = (notification: Notification, timeout?: number) => {
    const uuid = uuidV4()

    setStore({
      ...notificationState,
      [uuid]: notification,
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
    addNotification,
  }
}
