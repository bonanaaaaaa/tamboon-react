import React, { useState } from 'react';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import Header from './components/Header'
import CharityBox from './components/CharityBox'
import DonateDialog from './components/DonateDialog'
import NotificationBox from './components/NotificationBox'

import { useCharities } from "./charity/state";
import { usePayment } from "./payment/state";

import { renderByState } from "./core/dataState";
import { useNotifications } from "./core/notifications";


const WrappedGrid = (props) => (
  <Grid
    item
    xs={12}
    md={6}
    xl={3}
    {...props}
  />
)

const TotalDonationContainer = styled.div`
  padding: 10px 5px 0;
  min-height: 40px;
`

function App() {
  const { charitiesState } = useCharities();
  const { paymentState, submitPayment } = usePayment();
  const { notifications } = useNotifications();

  const [selectedCharity, setSelectedCharity] = useState({});
  const [donating, setDonating] = useState(false)

  const getDonationAmountByCharity = (payments, charityId) =>
    payments
      .filter(({ charitiesId }) => charitiesId == charityId)
      .reduce((sum, { amount }) => sum + amount, 0)

  const handleCharityChange = (charity) => () => {
    setSelectedCharity(charity);
    setDonating(true)
  }

  const handleOnDonate = (amount) => {
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
            <Typography
              gutterBottom
              align='right'
              variant="h5"
            >
              {`Total donation: loading...`}
            </Typography>
          ),
          loaded: payment => (
            <Typography
              gutterBottom
              align='right'
              variant="h5"
            >
              {`Total donation: ${payment.total}`}
            </Typography>
          ),
          error: (error) => (
            <Typography
              gutterBottom
              align='right'
              variant="subtitle2"
              color="error"
            >
              Cannot fetch donation data
            </Typography>
          )
        })}
      </TotalDonationContainer>
      <Grid container spacing={16} direction="row" justify="center" alignItems="center">
        {renderByState(charitiesState, {
          loading: () => (
            <LinearProgress />
          ),
          loaded: charities => (
            charities.map(c => (
              renderByState(paymentState, {
                loading: () => (
                  <WrappedGrid key={c.id}>
                    <CharityBox
                      charity={c}
                    />
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
                error: () => (
                  <WrappedGrid key={c.id}>
                    <CharityBox
                      charity={c}
                    />
                  </WrappedGrid>
                )
              })
            ))
          ),
          error: () => (
            <Typography
              gutterBottom
              align='right'
              variant="subtitle2"
              color="error"
            >
              Cannot fetch charities data
            </Typography>
          )
        })}
      </Grid>
      <DonateDialog
        charity={selectedCharity}
        open={donating}
        onCancel={() => setDonating(false)}
        onOk={amount => handleOnDonate(amount)}
      />
    </>
  );
}

export default App;
