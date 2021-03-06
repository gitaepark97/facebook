import { Fragment, useContext } from 'react'
import { UIContext } from '../../App'
import PostSubContent from './PostSubContent'
import { CardContent, CardMedia, Typography, Avatar, Divider, useTheme, useMediaQuery } from '@material-ui/core'

export default function PostContent({ post }) {
  const { uiState } = useContext(UIContext)
  const isContent = () => {
    return post.body.feelings || post.body.at || post.body.date
  }
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Fragment>
      {isContent() && (
        <CardContent
          style={{
            marginBottom: '16px',
            background: uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(240,242,245)',
            padding: '16px',
          }}
        >
          <PostSubContent post={post} />
        </CardContent>
      )}
      <CardContent>
        <Typography style={{ fontWeight: '400', fontSize: '16px', fontFamily: 'fantasy' }}>
          {post.content && post.content}
        </Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          style={{ width: '100%', maxHeight: '500px', objectFit: 'fill' }}
          component="img"
          image={post.image}
          title=""
        />
      )}
      {Object.keys(post.profilePostData).length ? (
        <>
          <CardMedia
            style={{ width: '100%', height: '200px' }}
            image={post.profilePostData.coverImage}
            title={post.user.name}
          />
          <Avatar
            style={{
              border: '6px solid tomato',
              width: xsScreen ? '300px' : '400px',
              height: xsScreen ? '300px' : '400px',
              display: 'flex',
              flexDirection: 'row',
              margin: 'auto',
              borderRadius: '100%',
              bottom: 130,
            }}
          >
            <img
              src={post.profilePostData.profileImage}
              width="100%"
              height="100%"
              alt={post.profilePostData.profileImage}
            />
          </Avatar>
        </>
      ) : null}
      <Divider />
    </Fragment>
  )
}
