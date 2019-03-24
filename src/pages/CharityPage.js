import React, { useState } from 'react';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import Header from '../components/Header'
import CharityBox from '../components/CharityBox'
import DonateDialog from '../components/DonateDialog'

import { useCharities } from "../charity/state";
import { usePayment } from "../payment/state";

import { renderByState } from "../core/dataState";

// xs, sm, md, lg, and xl


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
`

function CharityPage() {
  const { charitiesState } = useCharities();
  const { paymentState, submitPayment } = usePayment();

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
      <TotalDonationContainer>
      <Typography
          gutterBottom
          align='right'
          variant="h4"
        >
        {renderByState(paymentState, {
          loading: () => `Total donation: loading...`,
          loaded: payment => `Total donation: ${payment.total}`,
          error: () => <div>Error</div>
        })}
        </Typography>
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
                      onClick={handleCharityChange(c)}
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
                error: () => '.'
              })
            ))
          ),
          error: () => <div>Error</div>
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

export default CharityPage;
