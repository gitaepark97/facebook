import useStyles from './styles'
import { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UIContext, UserContext } from '../../App'
import ProfileMenu from './ProfileMenu'
import CreatePostMenu from './CreatePostMenu'
import AvartarText from '../UI/AvartarText'
import NotificationMenu from '../NotificationMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip, Avatar, IconButton, Badge, useMediaQuery, useTheme } from '@material-ui/core'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'

export default function RightMenu() {
  const classes = useStyles()
  const { uiState } = useContext(UIContext)
  const { userState } = useContext(UserContext)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const defaultPropsNotifi = {
    color: 'error',
    children: <FontAwesomeIcon icon={faBell} size={xsScreen ? 'xs' : 'sm'} />,
  }

  return (
    <Fragment>
      {uiState.mdScreen && (
        <Chip
          className={classes.profile_chip}
          activeStyle={{ backgroundColor: 'teal', color: '#fff' }}
          component={NavLink}
          to={`/profile/${userState.currentUser.id}`}
          label={<h3>{userState.currentUser.name.split(' ')[0].slice(0, 5) + '..'}</h3>}
          avatar={
            userState.currentUser.profile_pic ? (
              <Avatar src={userState.currentUser.profile_pic} alt="" />
            ) : (
              <AvartarText
                text={userState.currentUser.name}
                bg={userState.currentUser.active ? 'seagreen' : 'tomato'}
              />
            )
          }
        />
      )}
      <CreatePostMenu />
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        activeStyle={{ color: 'rgb(1, 133, 243' }}
        component={NavLink}
        to="/messenger"
      >
        <FontAwesomeIcon icon={faFacebookMessenger} size={xsScreen ? 'xs' : 'sm'} />
      </IconButton>
      <NotificationMenu>
        <Badge max={5} badgeContent={uiState.notifications.length || '0'} {...defaultPropsNotifi} />
      </NotificationMenu>
      <ProfileMenu />
    </Fragment>
  )
}
