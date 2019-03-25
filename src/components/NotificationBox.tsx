import React from 'react'
import styled from 'styled-components'

import SnackbarContent from '@material-ui/core/SnackbarContent'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

import Notification from '../types/notification'

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 480px;
  margin: auto;

  display: flex;
  flex-flow: column;
`

const NotificationWrapper = styled.div`
  padding: 2px;
`

const WrappedMessage = styled.span`
  display: flex;
  align-items: center;
`

const SuccessSnackbar = styled(SnackbarContent)`
  background-color: ${green[600]} !important;
  flex: 1;
`

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  font-size: 20px;
  margin-right: 10px;
`

const StyledErrorIcon = styled(ErrorIcon)`
  font-size: 20px;
  margin-right: 10px;
`

const ErrorSnackbar = styled(SnackbarContent)`
  background-color: ${red[600]} !important;
  flex: 1;
`

const renderNotification = (notification: Notification) => {
  switch (notification.type) {
    case 'success':
      return (
        <SuccessSnackbar
          message={
            <WrappedMessage>
              <StyledCheckCircleIcon />
              {notification.message}
            </WrappedMessage>
          }
        />
      )
    case 'error':
      return (
        <ErrorSnackbar
          message={
            <WrappedMessage>
              <StyledErrorIcon />
              {notification.message}
            </WrappedMessage>
          }
        />
      )
  }
}

interface Props {
  notifications: Notification[]
}

const NotificationBox = ({ notifications }: Props) => (
  <NotificationContainer>
    {notifications.map(notification => (
      <NotificationWrapper key={notification.message}>{renderNotification(notification)}</NotificationWrapper>
    ))}
  </NotificationContainer>
)

NotificationBox.displayName = 'NotificationBox'

export default NotificationBox
