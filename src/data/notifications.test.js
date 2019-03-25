import React from 'react'
import { shallow } from 'enzyme'
import { useNotifications } from './notifications'

describe('notifications', () => {
  test('should store notifications globally', () => {
    let senderNotifications
    let receiverNotifications
    let senderAddNotification

    function SenderComponent () {
      const { notifications, addNotification } = useNotifications()

      senderNotifications = notifications
      senderAddNotification = addNotification
    }
    function ReceiverComponent () {
      const { notifications } = useNotifications()

      receiverNotifications = notifications
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