import { useContext } from 'react'
import { UIContext } from '../App'
import { Drawer, Toolbar, useMediaQuery, useTheme } from '@material-ui/core'

export default function Sidebar({
  children,
  anchor = 'left',
  background = 'white',
  boxShadow = true,
  drawerWidth = 380,
}) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.between(960, 1400))
  const { uiState } = useContext(UIContext)

  return (
    <Drawer
      PaperProps={{
        style: {
          width: matches ? drawerWidth - 120 : drawerWidth,
          backgroundColor: background,
          boxShadow: boxShadow
            ? uiState.darkMode
              ? '1px 1px 3px rbg(36, 37, 38)'
              : '1px 1px 3px rgba(0,0,0,0.1)'
            : null,
          border: 'none',
        },
      }}
      elevation={0}
      variant="permanent"
      anchor={anchor}
    >
      <Toolbar />
      <div style={{ overflow: 'auto' }}>{children}</div>
    </Drawer>
  )
}
