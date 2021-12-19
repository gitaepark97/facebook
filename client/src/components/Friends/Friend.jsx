import { Fragment, useContext } from 'react'
import { UIContext, UserContext } from '../../App'
import AvartarText from '../UI/AvartarText'
import { Avatar, Typography, Card, CardActionArea, CardContent } from '@material-ui/core'

export default function Friend({ user, children }) {
  const { userDispatch } = useContext(UserContext)
  const { uiState, uiDispatch } = useContext(UIContext)

  return (
    <Fragment>
      <Card
        style={{
          width: '100%',
          backgroundColor: uiState.darkMode ? 'rgb(36,37,38)' : null,
        }}
        elevation={0}
      >
        <CardActionArea
          onClick={() => {
            userDispatch({ type: 'ADD_SELECTED_USER_PROFILE', payload: user })
            uiDispatch({ type: 'SET_DRAWER', payload: false })
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {user.profile_pic ? (
              <Avatar style={{ width: '60px', height: '60px' }}>
                <img style={{ width: '100%', height: '100%' }} src={user.profile_pic} alt="" />
              </Avatar>
            ) : (
              <AvartarText text={user.name} bg={user.active ? 'seagreen' : ' tomato'} />
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '8px',
              }}
            >
              <Typography style={{ marginBottom: '4px', fontWeight: '600' }} variant="subtitle1">
                {user.name}
              </Typography>
              <Typography variant="body2">{7} mutual friends</Typography>
            </div>
          </CardContent>
        </CardActionArea>
        {children}
      </Card>
    </Fragment>
  )
}
