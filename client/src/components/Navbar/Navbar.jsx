import useStyles from './styles'
import { Fragment, useContext } from 'react'
import { UIContext } from '../../App'
import MiddleMenu from './MiddleMenu'
import RightMenu from './RightMenu'
import SearchFriends from '../Friends/SearchFriends'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { AppBar, Toolbar, IconButton, useMediaQuery, useTheme, Tooltip } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

export default function Navbar() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const classes = useStyles()
  const theme = useTheme()
  const xsScreen = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Fragment>
      <AppBar
        style={{
          backgroundColor: !uiState.darkMode ? 'white' : 'rgb(36,37,38)',
          color: !uiState ? 'blue' : null,
          zIndex: '9999',
        }}
        className={classes.root}
        color="default"
        elevation={1}
      >
        <Toolbar>
          <div style={{ width: '31%' }} className={classes.leftMenu}>
            <FontAwesomeIcon
              style={{
                width: '40px',
                height: '40px',
                color: !uiState.darkMode ? 'rgb(0,133,243)' : null,
                marginRight: '8px',
              }}
              icon={faFacebook}
              size={xsScreen ? 'xs' : '2x'}
            />
            <SearchFriends />
            {!uiState.mdScreen && uiState.navDrawerMenu && (
              <Tooltip title={uiState.drawer ? 'click to close drawer' : 'click to open drawer'} arrow>
                <IconButton onClick={() => uiDispatch({ type: 'SET_DRAWER', payload: !uiState.drawer })}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
          </div>
          {uiState.mdScreen && (
            <div className={classes.middleMenu}>
              <MiddleMenu />
            </div>
          )}
          <div style={{ width: '29%' }} className={classes.rightMenu}>
            <RightMenu />
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}
