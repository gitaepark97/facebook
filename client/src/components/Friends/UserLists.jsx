import { useContext } from 'react'
import Friend from './Friend'
import { UserContext } from '../../App'
import useFriendActions from '../../hooks/useFriendActions'
import { Button, CardActions, Typography } from '@material-ui/core'

export default function UserLists({ users }) {
  const { userState } = useContext(UserContext)
  const { sendFriendRequest } = useFriendActions()

  const handleSendFriendRequest = user_id => {
    sendFriendRequest(user_id)
  }

  const filterUser = user => {
    let s_index = userState.sendedFriendRequests.findIndex(request => request.user.id === user.id)
    let r_index = userState.receivedFriendRequests.findIndex(request => request.user.id === user.id)
    let already_friend = userState.currentUser.friends.findIndex(friend => friend.id === user.id)
    let currentUser = userState.currentUser.id === user.id

    if (s_index === -1 && r_index === -1 && already_friend === -1 && !currentUser) {
      return true
    }
    return false
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginLeft: '8px',
        marginRight: '6px',
      }}
    >
      <Typography
        style={{
          fontWeight: '700',
          fontSize: '16px',
          marginTop: '8px',
          marginBottom: '8px',
        }}
      >
        People You May Know
      </Typography>
      {users && users.length
        ? users.map(user => (
            <div style={{ width: '100%' }} key={user.id}>
              {filterUser(user) && (
                <Friend user={user}>
                  <CardActions>
                    <Button
                      style={{
                        background: 'rgb(1,133,243)',
                        color: 'white',
                      }}
                      onClick={() => handleSendFriendRequest(user.id)}
                      variant="contained"
                    >
                      Add Friend
                    </Button>
                    <Button
                      style={{
                        background: 'rgb(240,242,245)',
                        color: 'black',
                      }}
                      variant="contained"
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Friend>
              )}
            </div>
          ))
        : null}
    </div>
  )
}
