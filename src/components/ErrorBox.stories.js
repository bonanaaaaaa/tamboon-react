import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ErrorBox from './ErrorBox'

storiesOf('ErrorBox', module)
  .add('1 error', () => {
    const errors = [
      new Error('test error')
    ]
    return <ErrorBox
      errors={errors}
    />
  })
  .add('multiple errors', () => {
    const errors = [
      new Error('test error 1'),
      new Error('test error 2')
    ]
    return <ErrorBox
      errors={errors}
    />
  })