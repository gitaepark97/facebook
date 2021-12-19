import { useContext, useState } from 'react'
import RecentAccounts from '../components/Auth/RecentAccount/RecentAccounts'
import LoginForm from '../components/Auth/LoginForm'
import SignupForm from '../components/Auth/SignupForm'
import { UIContext } from '../App'
import { Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core'

export default function Auth() {
  const [toggleLoginForm, setToggleLoginForm] = useState(true)
  const { uiState } = useContext(UIContext)

  return (
    <div style={{ paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        <Grid style={{ paddingTop: '30px' }} container justify="center" alignItems="flex-start" direction="column">
          <Typography style={{ fontWeight: 800, color: uiState.darkMode ? 'white' : 'black' }} variant="h6">
            Facebook
          </Typography>
          <Typography style={{ fontWeight: 800, color: uiState.darkMode ? 'white' : 'black' }} variant="h6">
            Recents Login
          </Typography>
          <Typography
            sytle={{ marginTop: '16px', fontWeight: 800, color: uiState.darkMode ? 'white' : 'black' }}
            variant="body2"
          >
            Click your picture or add an account
          </Typography>
        </Grid>
        <Grid style={{ marginTop: '20px' }} container spacing={3}>
          <Grid item xs={12} sm={6} md={8}>
            <RecentAccounts />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper style={{ padding: '16px', display: 'flex', flexDirection: 'column' }} elevation={8}>
              {toggleLoginForm ? <LoginForm /> : <SignupForm />}
              <Divider />
              <Button
                style={{ marginTop: '32px', background: 'rgb(74, 183, 43)', color: '#fff' }}
                onClick={() => setToggleLoginForm(!toggleLoginForm)}
              >
                {toggleLoginForm ? 'Create New Account' : 'Already have an Account'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
