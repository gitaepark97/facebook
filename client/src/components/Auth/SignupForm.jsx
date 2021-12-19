import { Fragment } from 'react'
import useSignupUser from '../../hooks/useSignupUser'
import { Button, CircularProgress, FormControl, TextField } from '@material-ui/core'

export default function LoginForm() {
  const { loading, error, handleSignupUser, handleNameChange, handlePasswordChange, handleEmailChange } =
    useSignupUser()

  return (
    <Fragment>
      <form onSubmit={handleSignupUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            style={{ marginTop: '16px' }}
            variant="outlined"
            label="name"
            type="text"
            onChange={handleNameChange}
            error={error && error.name ? true : false}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            style={{ marginTop: '16px' }}
            variant="outlined"
            label="Email"
            type="email"
            onChange={handleEmailChange}
            error={error && error.email ? true : false}
          />
        </FormControl>
        <FormControl style={{ width: '100%' }}>
          <TextField
            style={{ marginTop: '16px' }}
            variant="outlined"
            label="Password"
            type="password"
            onChange={handlePasswordChange}
            error={error && error.password ? true : false}
          />
        </FormControl>
        <Button
          style={{ width: '100%', background: 'rgb(24,119,242)', color: '#fff', marginTop: '16px' }}
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress style={{ color: '#fff' }} variant="indeterminate" size={25} /> : 'Sign up'}
        </Button>
      </form>
    </Fragment>
  )
}
