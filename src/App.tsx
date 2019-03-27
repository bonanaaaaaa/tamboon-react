import React, { useState } from 'react'
import styled from 'styled-components'

import Grid, { GridProps } from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import Header from './components/Header'
import CharityBox from './components/CharityBox'
import DonateDialog from './components/DonateDialog'
import NotificationBox from './components/NotificationBox'

import { useCharities, ICharity } from './data/charity'
import { usePayment, IPayment } from './data/payment'
import { useNotifications } from './data/notifications'

import { renderByState } from './core/dataState'

const WrappedGrid = (props: GridProps) => <Grid item xs={12} md={6} xl={3} {...props} />

const TotalDonationContainer = styled.div`
  padding: 10px 5px 0;
  min-height: 40px;
`

function App() {
  const { charitiesState } = useCharities()
  const { paymentState, submitPayment } = usePayment()
  const { notifications } = useNotifications()

  const [selectedCharity, setSelectedCharity] = useState<ICharity>({} as ICharity)
  const [donating, setDonating] = useState(false)

  const getDonationAmountByCharity = (payments: IPayment[], charityId: number) =>
    payments.filter(({ charitiesId }) => charitiesId === charityId).reduce((sum, { amount }) => sum + amount, 0)

  const handleCharityChange = (charity: ICharity) => () => {
    setSelectedCharity(charity)
    setDonating(true)
  }

  const handleOnDonate = (amount: number) => {
    setDonating(false)
    submitPayment(selectedCharity, amount)
  }

  return (
    <>
      <Header>Omise Tamboon</Header>
      <NotificationBox notifications={notifications} />
      <TotalDonationContainer>
        {renderByState(paymentState, {
          loading: () => (
            <Typography gutterBottom align="right" variant="h5">
              {`Total donation: loading...`}
            </Typography>
          ),
          loaded: payment => (
            <Typography gutterBottom align="right" variant="h5">
              {`Total donation: ${payment.total}`}
            </Typography>
          ),
          failed: () => (
            <Typography gutterBottom align="right" variant="subtitle2" color="error">
              Cannot fetch donation data
            </Typography>
          ),
        })}
      </TotalDonationContainer>
      <Grid container spacing={16} direction="row" justify="center" alignItems="center">
        {renderByState(charitiesState, {
          loading: () => <LinearProgress />,
          loaded: charities =>
            charities.map(c =>
              renderByState(paymentState, {
                loading: () => (
                  <WrappedGrid key={c.id}>
                    <CharityBox charity={c} />
                  </WrappedGrid>
                ),
                loaded: ({ payments }) => (
                  <WrappedGrid key={c.id}>
                    <CharityBox
                      charity={c}
                      donationAmount={getDonationAmountByCharity(payments, c.id)}
                      onClick={handleCharityChange(c)}
                    />
                  </WrappedGrid>
                ),
                failed: () => (
                  <WrappedGrid key={c.id}>
                    <CharityBox charity={c} />
                  </WrappedGrid>
                ),
              }),
            ),
          failed: () => (
            <Typography gutterBottom align="right" variant="subtitle2" color="error">
              Cannot fetch charities data
            </Typography>
          ),
        })}
      </Grid>
      <DonateDialog
        charity={selectedCharity}
        open={donating}
        onCancel={() => setDonating(false)}
        onOk={amount => handleOnDonate(amount)}
      />
    </>
  )
}

App.displayName = 'App'

export default App
