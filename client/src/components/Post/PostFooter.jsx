import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LikePost from './LikePost'
import { UserContext } from '../../App'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { Button, Typography, Divider, Grid } from '@material-ui/core'

export default function PostFooter({ post }) {
  const { userState } = useContext(UserContext)

  const filterLike = () => {
    let users = userState.currentUser.friends.filter(friend => post.likes.includes(friend.id))

    if (post.likes.includes(userState.currentUser.id)) {
      users.push(userState.currentUser)
    }

    return users.slice(0, 4)
  }

  useEffect(() => {
    filterLike()
    // eslint-disable-next-line
  }, [post.likes.length])

  return (
    <div style={{ margin: '8px 16px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '16px',
        }}
      >
        <FontAwesomeIcon
          style={{
            padding: '4px',
            borderRadius: '100%',
            color: '#fff',
            background: 'rgb(16,162,246)',
          }}
          icon={faThumbsUp}
          size="lg"
        />
        <Typography
          style={{
            marginLeft: '8px',
            color: 'rgb(133,112,118)',
            fontSize: '12px',
          }}
        >
          {filterLike().length ? (
            <>
              {filterLike().map(user => (
                <span key={user.id}>{user.name} ,</span>
              ))}{' '}
              ...
            </>
          ) : null}
        </Typography>
      </div>

      <Divider />

      <Grid style={{ padding: '8px 0px' }} container>
        <Grid item xs={6}>
          <LikePost post={post} />
        </Grid>

        <Grid item xs={6}>
          <Button
            style={{ width: '100%' }}
            startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            component={Link}
            to={`/post/${post.id}`}
          >
            view
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
