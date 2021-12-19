import { useContext } from 'react'
import { Link } from 'react-router-dom'
import PopoverProfile from '../Profile/PopoverProfile'
import { UIContext, UserContext } from '../../App'
import AvartarText from '../UI/AvartarText'
import StyledBadge from '../UI/StyledBadge'
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from '@material-ui/core'

export default function MyFriendLists() {
  const { userState } = useContext(UserContext)
  const { uiState } = useContext(UIContext)

  const friendsItem = user => (
    <ListItem button key={user.id} to={`/profile/${user.id}`} component={Link}>
      <ListItemAvatar>
        <StyledBadge isActive={user.active}>
          {user.profile_pic ? (
            <Avatar src={user.profile_pic} alt="" />
          ) : (
            <AvartarText text={user.name} bg={user.active ? 'seagreen' : 'tomato'} />
          )}
        </StyledBadge>
      </ListItemAvatar>

      <ListItemText primary={user.name} />
    </ListItem>
  )

  return (
    <>
      {userState.currentUser.friends && userState.currentUser.friends.length ? (
        <List
          style={{ marginTop: '16px' }}
          subheader={
            <ListSubheader>
              <Grid container alignItems="center" justifyContent="flex-start">
                <Typography
                  style={{
                    color: 'rgb(101,103,107)',
                    fontWeight: '800',
                  }}
                >
                  Contacts
                </Typography>
              </Grid>
            </ListSubheader>
          }
        >
          {userState.currentUser.friends.map(user => (
            <div key={user.id}>
              {uiState.mdScreen ? <PopoverProfile user={user}>{friendsItem(user)}</PopoverProfile> : friendsItem(user)}
            </div>
          ))}
        </List>
      ) : null}
    </>
  )
}
