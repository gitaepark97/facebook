import { Fragment, useContext } from 'react'
import { PostContext, UIContext, UserContext } from '../../App'
import { likeDislikePost } from '../../services/PostService'
import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as filledLike } from '@fortawesome/free-solid-svg-icons'

export default function LikePost({ post }) {
  const { postDispatch } = useContext(PostContext)
  const { uiDispatch } = useContext(UIContext)
  const { userState } = useContext(UserContext)

  const isLiked = () => {
    return post.likes.includes(userState.currentUser.id)
  }

  const handleLike = () => {
    likeDislikePost(post.id).then(res => {
      if (res.data) {
        postDispatch({
          type: 'LIKE_UNLIKE_POST',
          payload: res.data.post,
        })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'success',
            text: res.data.message,
            display: true,
          },
        })
      }
      if (res.error) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            text: res.error,
            display: true,
          },
        })
      }
    })
  }

  return (
    <Fragment>
      <Button
        style={{ width: '100%' }}
        onClick={handleLike}
        color={isLiked() ? 'primary' : 'inherit'}
        startIcon={isLiked() ? <FontAwesomeIcon icon={filledLike} /> : <FontAwesomeIcon icon={faThumbsUp} />}
      >
        ({post.likes.length})
      </Button>
    </Fragment>
  )
}
