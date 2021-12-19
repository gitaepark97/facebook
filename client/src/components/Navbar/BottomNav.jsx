import { useContext } from 'react'
import { UIContext } from '../../App'
import MiddleMenu from './MiddleMenu'
import { BottomNavigation, Paper } from '@material-ui/core'

export default function BottomNav() {
  const { uiState } = useContext(UIContext)

  return (
    <Paper style={{ width: '100%', position: 'fixed', bottom: 0, zIndex: 3 }} elevation={0}>
      <BottomNavigation
        style={{
          width: '100%',
          background: uiState.darkMode ? 'rgb(24,25,26)' : 'rgb(240,242,245)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: '8px 0px',
        }}
      >
        <MiddleMenu />
      </BottomNavigation>
    </Paper>
  )
}
