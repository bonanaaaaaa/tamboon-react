import React from 'react'
import { shallow } from 'enzyme'
import { useNotifications } from './notifications'

import Notification from '../types/notification'

describe('notifications', () => {
  test('should store notifications globally', () => {
    let senderNotifications: Notification[] = []
    let receiverNotifications: Notification[] = []
    let senderAddNotification: (notification: Notification, timeout?: number | undefined) => void = () => {}

    function SenderComponent() {
      const { notifications, addNotification } = useNotifications()

      senderNotifications = notifications
      senderAddNotification = addNotification

      return <div />
    }
    function ReceiverComponent() {
      const { notifications } = useNotifications()

      receiverNotifications = notifications

      return <div />
    }

    shallow(<SenderComponent />)
    shallow(<ReceiverComponent />)

    expect(senderNotifications).toEqual([])
    expect(receiverNotifications).toEqual([])

    senderAddNotification({ type: 'success', message: 'success test' })

    expect(senderNotifications).toEqual([{ type: 'success', message: 'success test' }])
    expect(receiverNotifications).toEqual([{ type: 'success', message: 'success test' }])
  })
})
