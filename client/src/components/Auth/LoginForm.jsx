import { Fragment } from 'react'
import useLoginUser from '../../hooks/useLoginUser'
import { Button, CircularProgress, FormControl, TextField } from '@material-ui/core'

export default function LoginForm() {
  const { loading, error, handleLoginUser, handlePasswordChange, handleEmailChange } = useLoginUser()

  return (
    <Fragment>
      <form onSubmit={handleLoginUser}>
        <FormControl style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            onChange={handleEmailChange}
            error={error && error.email ? true : false}
            helperText={error && error.password ? error.password : null}
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
            helperText={error && error.password ? error.password : null}
          />
        </FormControl>
        <Button
          style={{ width: '100%', background: 'rgb(24,119,242)', color: '#fff', marginTop: '16px' }}
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress style={{ color: '#fff' }} variant="indeterminate" size={25} /> : 'Log In'}
        </Button>
      </form>
    </Fragment>
  )
}
