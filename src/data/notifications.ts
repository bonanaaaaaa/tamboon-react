import uuidV4 from 'uuid/v4'

import { createStore } from '../core/store'
export interface INotification {
  type: string
  message: string
}
interface INotificationState {
  [key: string]: INotification
}

const { useStore } = createStore<INotificationState>({})

const deleteMap = (map: INotificationState, key: string) => {
  const newMap = { ...map }
  delete newMap[key]
  return newMap
}

let notificationState: INotificationState

export const useNotifications = () => {
  const [notificationMap, setStore] = useStore()

  notificationState = notificationMap

  const addNotification = (notification: INotification, timeout?: number) => {
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
