import { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext, UIContext } from '../../App'
import { LogoutUser } from '../../services/AuthService'
import AvartarText from '../UI/AvartarText'
import {
  Menu,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Switch,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons'
import { Settings as SettingsIcon, ExitToApp as LogoutIcon } from '@material-ui/icons'

export default function ProfileMenu() {
  const history = useHistory()
  const { userState, userDispatch } = useContext(UserContext)
  const { uiState, uiDispatch } = useContext(UIContext)
  const [profileMenu, setProfileMenu] = useState(null)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  const handleUserLogout = () => {
    LogoutUser().then(res => {
      if (res.data) {
        userDispatch({
          type: 'ADD_RECENT_ACCOUNT',
          payload: res.data.account,
        })
        userDispatch({ type: 'LOGOUT_USER' })
        history.push('/')
      }
      if (res.error) {
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            color: 'error',
            display: true,
            text: res.data.error,
          },
        })
      }
    })
  }

  return (
    <div>
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: !uiState.darkMode ? 'dark' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        onClick={event => setProfileMenu(event.currentTarget)}
      >
        <FontAwesomeIcon icon={faChevronDown} size={xsScreen ? 'xs' : 'sm'} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={profileMenu}
        open={Boolean(profileMenu)}
        style={{ marginTop: '50px' }}
        onClose={() => setProfileMenu(null)}
        elenation={7}
      >
        <List>
          <ListItem button component={Link} to={`/profile/${userState.currentUser.id}`}>
            <ListItemIcon>
              {userState.currentUser.profile_pic ? (
                <Avatar style={{ width: '60px', height: '60px' }}>
                  <img src={userState.currentUser.profile_pic} width="100%" height="100%" alt="" />
                </Avatar>
              ) : (
                <AvartarText
                  text={userState.currentUser.name}
                  bg={userState.currentUser.active ? 'seagren' : 'tomato'}
                />
              )}
            </ListItemIcon>
            <ListItemText style={{ marginLeft: '8px' }}>
              <Typography style={{ fontSize: '17px', fontWeight: '700' }}>{userState.currentUser.name}</Typography>
              <Typography>See Your Profile</Typography>
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to={'/settings'}>
            <ListItemIcon>
              <Avatar style={{ background: 'teal', color: '#fff' }}>
                <SettingsIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText>
              <Typography style={{ fontSize: '15px' }}>Settings</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Avatar style={{ background: 'teal', color: '#fff' }}>
                {uiState.darkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
              </Avatar>
            </ListItemIcon>
            <ListItemText>
              <Switch
                checked={uiState.darkMode}
                onChange={event =>
                  uiDispatch({
                    type: 'SET_DARK_MODE',
                    payload: event.target.checked,
                  })
                }
                name="checkedB"
                color="primary"
              />
            </ListItemText>
          </ListItem>
          <ListItem button onClick={handleUserLogout}>
            <ListItemIcon>
              <Avatar style={{ background: 'teal', color: '#fff' }}>
                <LogoutIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText>
              <Typography style={{ fontSize: '15px' }}>Logout</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Menu>
    </div>
  )
}
