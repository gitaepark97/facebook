import { useContext } from 'react'
import moment from 'moment'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import AvartarText from '../UI/AvartarText'
import { UIContext } from '../../App'
import { MoreHoriz } from '@material-ui/icons'
import { Avatar, Card, CardHeader, IconButton, Typography } from '@material-ui/core'

export default function Post({ post }) {
  const { uiState } = useContext(UIContext)

  return (
    <Card
      style={{
        marginTop: '20px',
        backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
      }}
    >
      <CardHeader
        avatar={
          post.user && post.user.profile_pic ? (
            <Avatar>
              <img style={{ width: '100%', height: '100%' }} src={post.user.profile_pic} alt="" />
            </Avatar>
          ) : (
            <AvartarText text={post.user.name} bg={post.user.active ? 'seagreen' : 'tomato'} />
          )
        }
        action={
          <IconButton>
            <MoreHoriz />
          </IconButton>
        }
        title={post && <Typography style={{ fontWeight: '800' }}>{post.user.name}</Typography>}
        subheader={post && moment(post.createdAt).fromNow()}
      />
      <PostContent post={post} />
      <PostFooter post={post} />
    </Card>
  )
}
