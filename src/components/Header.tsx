import React from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Root = styled.div`
  flex-grow: 1;
`

function Header({ children }) {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {children}
          </Typography>
        </Toolbar>
      </AppBar>
    </Root>
  )
}

Header.displayName = 'Header'

export default Header
