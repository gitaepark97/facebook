import { Typography } from '@material-ui/core'

export default function PostSubContent({ post }) {
  const isContent = () => {
    return post.body.feelings || post.body.at || post.body.date
  }

  return (
    <div>
      <Typography>
        <b>{isContent() && post.user.name}</b>
        {post.body.feelings ? (
          <>
            &nbsp; is feeling <b>{post.body.feelings}</b>{' '}
          </>
        ) : null}
        {post.body.at ? (
          <>
            {`at`} <b>{post.body.at} </b>
          </>
        ) : null}
        {post.body.date ? (
          <>
            <b>{new Date(post.body.date).toLocaleDateString()}</b>
          </>
        ) : null}
      </Typography>
    </div>
  )
}
