import { Avatar, Grid, Typography } from '@material-ui/core'
import selectFriends from '../../assets/selectFriends.svg'

export default function FriendNotSelected() {
  return (
    <Grid
      style={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      item
      md={8}
      xs={12}
      sm={12}
    >
      <Avatar style={{ width: '100px', height: '100px' }}>
        <img style={{ width: '100%', height: '100%' }} src={selectFriends} alt="" />
      </Avatar>
      <Typography style={{ marginTop: '16px', fontWeight: '800' }}>
        Select friends from friend lists to start chat
      </Typography>
    </Grid>
  )
}
