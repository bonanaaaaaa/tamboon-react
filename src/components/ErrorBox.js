import React from 'react'
import styled from 'styled-components'

import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography'
import red from '@material-ui/core/colors/red'

const StyledErrorIcon = styled(ErrorIcon)`
  font-size: 20px;
  margin-right: 10px;
`

const ErrorContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 200px;
  max-width: 300px;
  margin: auto;

  display: flex;
  flex-flow: column;
`

const ErrorWrapper = styled.div`
  padding: 2px;
`

const WrappedMessage = styled.span`
  display: flex;
  align-items: center;
`

const ErrorSnackbar = styled(SnackbarContent)`
  background-color: ${red[600]} !important;
  flex: 1;
`

const ErrorBox = ({errors}) => (
  <ErrorContainer>
    {errors.map(error => (
      <ErrorWrapper key={error.message}>
        <ErrorSnackbar
          open
          message={
            <WrappedMessage>
              <StyledErrorIcon />
              {error.message}
            </WrappedMessage>
          }
        />
      </ErrorWrapper>
    ))}
  </ErrorContainer>
)

export default ErrorBox