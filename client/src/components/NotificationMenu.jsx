import { useContext, useState } from 'react'
import moment from 'moment'
import { UIContext } from '../App'
import useUpdateProfile from '../hooks/useUpdateProfile'
import {
  Menu,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { DeleteOutlined, Notifications as NotificationIcon } from '@material-ui/icons'

export default function NotificationMenu({ children }) {
  const { uiState } = useContext(UIContext)
  const [menu, setMenu] = useState(null)
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))
  const { clearNotification } = useUpdateProfile()

  return (
    <div>
      <IconButton
        style={{
          marginLeft: xsScreen ? '4px' : '8px',
          color: !uiState.darkMode ? 'black' : null,
          backgroundColor: !uiState.darkMode ? '#F0F2F5' : null,
        }}
        onClick={event => setMenu(event.currentTarget)}
      >
        {children}
      </IconButton>
      <Menu
        style={{ marginTop: '50px' }}
        id="post-menu"
        anchorEl={menu}
        keepMounted
        open={Boolean(menu)}
        onClose={() => setMenu(null)}
        elevation={7}
      >
        <List
          subheader={
            <ListSubheader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography style={{ fontSize: '18px', fontWeight: '600' }}>Notifications</Typography>
              {uiState.notifications.length ? (
                <IconButton onClick={() => clearNotification()}>
                  <DeleteOutlined />
                </IconButton>
              ) : null}
            </ListSubheader>
          }
        >
          {uiState.notifications ? (
            uiState.notifications.map(notifi => (
              <ListItem butoon key={notifi.id}>
                <ListItemIcon>
                  <Avatar style={{ background: 'seagreen', color: '#fff' }}>
                    <NotificationIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText>
                  <Typography style={{ fontSize: '15px' }} variant="body1">
                    {notifi.body}
                  </Typography>
                  <Typography style={{ fontSize: '13px', color: !uiState.darkMode ? '#65676B' : null }}>
                    {moment(notifi.createdAt).fromNow()}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText>
                <Typography style={{ fontsize: '16px' }}>No notifications</Typography>
              </ListItemText>
            </ListItem>
          )}
        </List>
      </Menu>
    </div>
  )
}
