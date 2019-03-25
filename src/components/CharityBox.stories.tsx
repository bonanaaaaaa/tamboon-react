import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CharityBox from './CharityBox'

const charity = {
  id: 1,
  name: 'Baan Kru Noi',
  image: 'baan-kru-noi.jpg',
  currency: 'THB',
}

storiesOf('CharityBox', module)
  .add('without donationAmount', () => <CharityBox charity={charity} onClick={action('donate-button-click')} />)
  .add('with donationAmount', () => (
    <CharityBox charity={charity} donationAmount={10000} onClick={action('donate-button-click')} />
  ))
