import { Typography } from '@material-ui/core'

export default function CustomHeaderText({ userState, body }) {
  const filterUserById = user_id => {
    return userState.users.find(user => user.id === user_id)
  }

  return (
    <Typography>
      <b>{userState.currentUser.name}</b>
      {body.feelings ? (
        <>
          &nbsp; is feeling <b>{body.feelings}</b>
        </>
      ) : null}
      {body.with.length ? (
        <>
          {'with'}
          <b>
            {body.with.map(user => (
              <> &nbsp;{filterUserById(user).name},</>
            ))}
          </b>
        </>
      ) : null}
      {body.at ? (
        <>
          {'at'} <b>{body.at}</b>
        </>
      ) : null}
      {body.date ? (
        <>
          <b>{new Date(body.date).toLocaleDateString()}</b>
        </>
      ) : null}
    </Typography>
  )
}
