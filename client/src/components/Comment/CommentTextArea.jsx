import { useContext, useState } from 'react'
import AvartarText from '../UI/AvartarText'
import StyledBadge from '../UI/StyledBadge'
import { UIContext, UserContext } from '../../App'
import useCreateComment from '../../hooks/useCreateComment'
import { SendOutlined } from '@material-ui/icons'
import { Avatar, Grid, IconButton, LinearProgress, Paper, TextField } from '@material-ui/core'

export default function CommentTextArea({ post }) {
  const { userState } = useContext(UserContext)
  const { uiState } = useContext(UIContext)
  const [commentText, setCommentText] = useState('')
  const [commentImage, setCommentImage] = useState()
  const [error, setError] = useState('')
  const { createComment, loading } = useCreateComment({
    post_id: post.id,
    commentText,
    setCommentText,
    setCommentImage,
    commentImage,
    setError,
  })

  const handleCommentChange = e => {
    setError('')
    setCommentText(e.target.value)
  }

  return (
    <>
      <Grid
        style={{
          marginTop: '8px',
          marginBottom: '8px',
        }}
        container
        justifyContent="flex-start"
        spacing={1}
      >
        <Grid item>
          <StyledBadge isActive={userState.currentUser.active}>
            {userState.currentUser.profile_pic ? (
              <Avatar>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src={userState.currentUser.profile_pic}
                  alt={userState.currentUser.name}
                />
              </Avatar>
            ) : (
              <AvartarText text={userState.currentUser.name} bg="tomato" />
            )}
          </StyledBadge>
        </Grid>
        <Grid item md={8} sm={8} xs={8}>
          <TextField
            style={{
              width: '100%',
              borderRadius: '20px',
              border: 'none',
              background: uiState.darkMode ? 'rgb(24,25,26)' : 'rgb(240,242,245)',
              padding: '8px 16px',
            }}
            placeholder="Write a Comments..."
            error={error ? true : false}
            helperText={error}
            value={commentText}
            onChange={handleCommentChange}
            multiline
            rowsMax={4}
          />
        </Grid>
        <Grid item ms={2} sm={2} xs={2}>
          <IconButton onClick={createComment}>
            <SendOutlined />
          </IconButton>
        </Grid>
      </Grid>

      {loading ? (
        <Paper
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          elevation={0}
        >
          <LinearProgress color="primary" style={{ width: '100%' }} />
        </Paper>
      ) : null}
    </>
  )
}
