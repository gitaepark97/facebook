import AvartarText from '../../UI/AvartarText'
import useLoginUser from '../../../hooks/useLoginUser'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default function LoginCard({ account, loginOpen, setLoginOpen, userData }) {
  const { loading, error, handleLoginUser, handlePasswordChange } = useLoginUser(userData)

  return (
    <Dialog
      style={{ width: '100%' }}
      disableEscapeKeyDown
      fullWidth
      scroll="body"
      maxWidth="sm"
      open={loginOpen}
      onClose={() => setLoginOpen(false)}
    >
      <Card style={{ width: '100%' }}>
        <CardHeader
          action={
            <IconButton color="primary" onClick={() => setLoginOpen(false)}>
              <Close />
            </IconButton>
          }
        />
        {account.profile_pic ? (
          <CardMedia
            style={{ height: '150px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Avatar src={account.profile_pic} style={{ height: '200px', width: '200px' }} />
          </CardMedia>
        ) : (
          <CardMedia style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AvartarText bg="teal" text={account.name} size="100px" fontSize="35px" />
          </CardMedia>
        )}
        <CardContent>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography style={{ fontWeight: '800', fontSize: '20px', marginTop: '8px' }}>
              {userData && userData.name}
            </Typography>
          </div>
          <form onSubmit={handleLoginUser}>
            <FormControl style={{ width: '100%' }}>
              <TextField
                style={{ marginTop: '16px' }}
                error={error && error.password ? true : false}
                helperText={error && error.password ? error.password : null}
                variant="outlined"
                type="password"
                label="Password"
                onChange={handlePasswordChange}
              />
            </FormControl>
            <Button
              style={{ width: '100%', background: 'rgb(24, 119, 242)', color: '#fff', marginTop: '16px' }}
              variant="contained"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress variant="indeterminate" size={25} style={{ color: '#fff' }} /> : 'Log In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Dialog>
  )
}
