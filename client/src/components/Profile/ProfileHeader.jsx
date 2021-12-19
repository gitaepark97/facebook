import { useContext } from 'react'
import UpdateProfileImage from './UpdateProfileImage'
import UpdateCoverImage from './UpdateCoverImage'
import { UserContext } from '../../App'
import { Paper, Typography, makeStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    height: '40vh',
    marginTop: '60px',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '100% 40vh',
  },
  overlay: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '40vh',
    top: 0,
  },
}))

export default function ProfileHeader({ user }) {
  const { userState } = useContext(UserContext)
  const classes = useStyles()

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={6}>
          <Paper
            style={{
              backgroundImage: user.cover_image ? 'url(' + user.cover_image + ')' : null,
            }}
            elevation={10}
            className={classes.paper}
          >
            <UpdateProfileImage user={user} type="profile" />
            {userState.currentUser.id === user.id && (
              <>
                <UpdateCoverImage />
              </>
            )}
            <div className={classes.overlay}></div>
          </Paper>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '30px' }} container justifyContent="center" alignItems="center">
        <Grid
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Typography style={{ fontSize: '30px', fontWeight: '800' }}>{user.name}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}
