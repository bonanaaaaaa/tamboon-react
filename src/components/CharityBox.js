import React from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

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

function CharityBox ({
  charity,
  donationAmount,
  onClick
}) {
  const imgSrc = `/images/${charity.image}`

  return (
    <div>
      <Container>
        <Item>
          <StyledCard>
            <StyledCardMedia
              image={imgSrc}
              title={charity.name}
            />
            {donationAmount
            ?
            (
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
            )
            :
            (
              <LinearProgress
                size={24}
                thickness={4}
              />
            )
            }
          </StyledCard>
        </Item>
      </Container>
    </div>
  )
}

export default CharityBox