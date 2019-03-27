import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import LinearProgress from '@material-ui/core/LinearProgress'

import { ICharity } from '../data/charity'

const StyledCardMedia = styled(CardMedia)`
  height: 260px;
`

const StyledCard = styled(Card)`
  height: 400px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Item = styled.div`
  flex: 1;
  min-width: 480px;
  max-width: 480px;
`

interface Props {
  charity: ICharity
  donationAmount?: number
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

function CharityBox({ charity, donationAmount, onClick }: Props) {
  const imgSrc = `/images/${charity.image}`

  return (
    <div>
      <Container>
        <Item>
          <StyledCard>
            <StyledCardMedia image={imgSrc} title={charity.name} />
            {donationAmount ? (
              <>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {charity.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {`Total donation: ${donationAmount} ${charity.currency}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={onClick} disabled={!donationAmount}>
                    Donate
                  </Button>
                </CardActions>
              </>
            ) : (
              <LinearProgress variant="query" />
            )}
          </StyledCard>
        </Item>
      </Container>
    </div>
  )
}

CharityBox.displayName = 'CharityBox'

export default CharityBox
