import { useContext } from 'react'
import AvartarText from '../UI/AvartarText'
import { likeDislikeComment } from '../../services/PostService'
import { PostContext, UserContext, UIContext } from '../../App'
import {
  Avatar,
  Button,
  Divider,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as filledLike } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default function Comment({ comment }) {
  const { postDispatch } = useContext(PostContext)
  const { userState } = useContext(UserContext)
  const { uiDispatch, uiState } = useContext(UIContext)

  const handleLikeComment = () => {
    likeDislikeComment(comment.id).then(res => {
      if (res.data) {
        postDispatch({ type: 'LIKE_UNLIKE_COMMENT', payload: res.data.comment })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: { color: 'success', text: res.data.message, display: true },
        })
      }
    })
  }

  const isLiked = () => {
    return comment.likes.includes(userState.currentUser.id)
  }

  const listItems = (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        {comment.user.profile_pic ? (
          <Avatar>
            <img style={{ width: '100%', height: '100%' }} src={comment.user.profile_pic} alt="" />
          </Avatar>
        ) : (
          <AvartarText text={comment.user.name} bg={comment.user.active ? 'seagreen' : 'tomato'} />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={<Typography style={{ color: uiState.darkMode && '#fff' }}>{comment.user.name}</Typography>}
        secondary={
          <>
            {comment.body.text && comment.body.text}
            {comment.body.image && (
              <Paper elevation={0} style={{ padding: '8px' }}>
                <Avatar variant="square" style={{ width: '40%', height: '100%' }}>
                  <img style={{ width: '100%', height: '100%' }} src={comment.body.image} alt="" />
                </Avatar>
              </Paper>
            )}
          </>
        }
      />
    </ListItem>
  )

  return (
    <div style={{ marginTop: '16px', marginBottom: !uiState.mdScreen && '50px' }}>
      <List>
        {listItems}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={handleLikeComment}
            size="small"
            color="primary"
            startIcon={
              isLiked() ? (
                <FontAwesomeIcon icon={filledLike} size="sm" />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} size="sm" />
              )
            }
          >
            ({comment.likes.length})
          </Button>
        </div>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  )
}
