import { useContext, useEffect } from 'react'
import { UIContext, UserContext } from '../App'
import Sidebar from '../components/Sidebar'
import UserLists from '../components/Friends/UserLists'
import DrawerBar from '../components/Navbar/DrawerBar'
import UserProfile from '../components/Profile/UserProfile'
import Friend from '../components/Friends/Friend'
import useFriendAction from '../hooks/useFriendActions'
import selectFriends from '../assets/selectFriends.svg'
import { fetchIncommingFriendRequests, fetchRecommandedUsers, fetchSendedFriendRequests } from '../services/UserService'
import { Typography, makeStyles, Avatar, Grid, CardActions, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  sidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '16px',
  },
  noRequest: { marginLeft: '32px', marginTop: '16px', color: 'grey' },
  divider: {
    width: '90%',
    height: '1px',
    marginTop: '16px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    marginLeft: '320px',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: 0,
    },
  },
  avatar: { width: '112px', height: '112px', background: 'transparent' },
  image: { width: '100%', height: '100%' },
  selectText: {
    color: '#65676B',
    fontSize: '20px',
    fontFamily: 'sans-serif',
    fontWeight: '700',
  },
}))

export default function Friends() {
  const classes = useStyles()
  const { uiState, uiDispatch } = useContext(UIContext)
  const { userState, userDispatch } = useContext(UserContext)

  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })

    const sendedFriendRequest = async () => {
      const res = await fetchSendedFriendRequests()
      if (res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_SENDED',
          payload: res.data.friends,
        })
      }
    }

    const incommingFriendRequest = async () => {
      const res = await fetchIncommingFriendRequests()
      if (res && res.data) {
        userDispatch({
          type: 'SET_FRIENDS_REQUEST_RECEIVED',
          payload: res.data.friends,
        })
      }
    }

    const recommandedUser = async () => {
      const res = await fetchRecommandedUsers()
      if (res && res.data) {
        userDispatch({
          type: 'SET_USERS',
          payload: res.data.users,
        })
      }
    }

    recommandedUser()
    incommingFriendRequest()
    sendedFriendRequest()

    return () => {
      userDispatch({ type: 'REMOVE_SELECTED_USER_PROFILE', payload: null })
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
    }
  }, [uiDispatch, userDispatch])

  const { acceptFriendRequest, declineFriendRequest, cancelFriendRequest } = useFriendAction()

  const handleAcceptFriendRequest = request_id => {
    acceptFriendRequest(request_id)
  }

  const handleDeclineFriendRequest = request_id => {
    declineFriendRequest(request_id)
  }

  const handleCancelFriendRequest = request_id => {
    cancelFriendRequest(request_id)
  }

  const metaData = (
    <div className={classes.sidebarContainer}>
      <Typography variant="h4">Friends</Typography>
      {userState.sendedFriendRequests.length ? (
        <>
          <Typography variant="h6">Sended Friend Request</Typography>
          {userState.sendedFriendRequests.map(request => (
            <Friend user={request.user} key={request.id}>
              <CardActions>
                <Button
                  style={{
                    background: 'tomato',
                    color: 'white',
                  }}
                  onClick={() => handleCancelFriendRequest(request.id)}
                  variant="contained"
                >
                  Cancel
                </Button>
              </CardActions>
            </Friend>
          ))}
        </>
      ) : null}
      {userState.receivedFriendRequests.length ? (
        <>
          <Typography variant="h6">Incomming Friend Requests</Typography>
          {userState.receivedFriendRequests.map(request => (
            <div>
              <Friend user={request.user} key={request.id}>
                <CardActions>
                  <Button
                    style={{
                      background: 'seagreen',
                      color: 'white',
                    }}
                    onClick={() => handleAcceptFriendRequest(request.id)}
                    variant="contained"
                  >
                    Accept
                  </Button>
                  <Button
                    style={{
                      background: 'tomato',
                      color: 'white',
                    }}
                    variant="contained"
                    onClick={() => handleDeclineFriendRequest(request.id)}
                  >
                    Decline
                  </Button>
                </CardActions>
              </Friend>
            </div>
          ))}
        </>
      ) : null}
    </div>
  )

  return (
    <div>
      {uiState.mdScreen ? (
        <Grid container spacing={0}>
          <Grid item md={3}>
            <Sidebar background={uiState.darkMode && 'rgb(36,37,38)'}>
              {metaData}
              <UserLists users={userState.users} />
            </Sidebar>
          </Grid>
          <Grid style={{ margin: 'auto' }} item md={8}>
            {userState.selectedUserProfile && <UserProfile user={userState.selectedUserProfile} conScreen={true} />}
          </Grid>
        </Grid>
      ) : (
        <>
          <DrawerBar>
            {metaData}
            <UserLists users={userState.users} />
          </DrawerBar>
          {userState.selectedUserProfile && <UserProfile user={userState.selectedUserProfile} />}
        </>
      )}
      {!userState.selectedUserProfile && (
        <div className={classes.main} style={{ backgroundColor: uiState.darkMode ? 'rgb(24,25,26)' : null }}>
          <Avatar variant="square" className={classes.avatar}>
            <img src={selectFriends} className={classes.image} alt="" />
          </Avatar>
          <Typography className={classes.selectText}>Select people's names to preview their profile.</Typography>
        </div>
      )}
    </div>
  )
}
