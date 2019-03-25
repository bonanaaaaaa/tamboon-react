import React from 'react'
import { storiesOf } from '@storybook/react'
import NotificationBox from './NotificationBox'

storiesOf('NotificationBox', module)
  .add('1 error', () => {
    const notifications = [{ type: 'error', message: 'test error' }]
    return <NotificationBox notifications={notifications} />
  })
  .add('multiple errors', () => {
    const notifications = [{ type: 'error', message: 'test error 1' }, { type: 'error', message: 'test error 2' }]
    return <NotificationBox notifications={notifications} />
  })
  .add('multiple successes', () => {
    const notifications = [
      { type: 'success', message: 'test success 1' },
      { type: 'success', message: 'test success 2' },
    ]
    return <NotificationBox notifications={notifications} />
  })
