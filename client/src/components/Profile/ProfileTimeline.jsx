import { useContext } from 'react'
import WritePostCard from '../Post/PostForm/WritePostCard'
import { UserContext, PostContext } from '../../App'
import Posts from '../Post/Posts'
import { Grid } from '@material-ui/core'

export default function ProfileTimeline({ user }) {
  const { userState } = useContext(UserContext)
  const { postState } = useContext(PostContext)

  const getUserPost = () => {
    return postState.posts.filter(post => post.user.id === user.id)
  }

  return (
    <Grid style={{ marginTop: '25px' }} container justifyContent="center" spacing={2}>
      <Grid item xs={12} sm={12} md={8}>
        {userState.currentUser.id === user.id && <WritePostCard />}
        <Posts posts={getUserPost()} />
      </Grid>
    </Grid>
  )
}
