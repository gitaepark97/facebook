import { useContext } from 'react'
import { UserContext, ChatContext, UIContext } from '../../App'
import { fetchFriendMessages } from '../../services/ChatService'
import AvartarText from '../UI/AvartarText'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, ListSubheader, Typography } from '@material-ui/core'

export default function Friends() {
  const { userState } = useContext(UserContext)
  const { chatDispatch } = useContext(ChatContext)
  const { uiState, uiDispatch } = useContext(UIContext)

  const handleFriendSelect = friend => {
    uiDispatch({ type: 'SET_DRAWER', payload: false })
    chatDispatch({ type: 'SET_SELECTED_FRIEND', payload: friend })
    fetchFriendMessages(friend.id).then(res => {
      if (res.data) {
        chatDispatch({ type: 'SET_MESSAGES', payload: res.data.data })
      }
    })
  }

  return (
    <List
      style={{ backgroundColor: uiState.darkMode && 'rgb(36,37,38)' }}
      key=""
      subheader={<ListSubheader component="div">Your Friends</ListSubheader>}
    >
      {userState.currentUser.friends && userState.currentUser.friends.length ? (
        userState.currentUser.friends.map(friend => {
          return (
            <ListItem key={friend.id} button onClick={() => handleFriendSelect(friend)}>
              <ListItemAvatar>
                {friend.profile_pic ? (
                  <Avatar alt={friend.name} src={friend.profile_pic} />
                ) : (
                  <AvartarText text={friend.name} bg={friend.active ? 'seagreen' : 'tomato'} />
                )}
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
            </ListItem>
          )
        })
      ) : (
        <Typography>No Friends</Typography>
      )}
    </List>
  )
}
