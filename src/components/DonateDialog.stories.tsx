import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import DonateDialog from './DonateDialog'

const charity = {
  id: 1,
  name: 'Baan Kru Noi',
  image: 'baan-kru-noi.jpg',
  currency: 'THB',
}

storiesOf('DonateDialog', module)
  .add('onWeb', () => {
    return <DonateDialog charity={charity} open onChange={action('onChange')} />
  })
  .add(
    'onMobile',
    () => {
      return <DonateDialog charity={charity} open onChange={action('onChange')} />
    },
    { viewport: { defaultViewport: 'iphonex' } },
  )
