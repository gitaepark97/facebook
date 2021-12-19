import { Suspense, useContext, useEffect, useState, lazy } from 'react'
import { UIContext } from '../App'
import DrawerBar from '../components/Navbar/DrawerBar'
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core'
import { SecurityOutlined, LocationCityOutlined, PersonOutline } from '@material-ui/icons'

const General = lazy(() => import('../components/settings/General/General'))
const SecurityAndLogin = lazy(() => import('../components/settings/SecurityAndLogin/SecurityAndLogin'))
const Location = lazy(() => import('../components/settings/Location/Location'))

export default function Settings() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const [tab, setTab] = useState('general')

  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })
    uiDispatch({ type: 'SET_DRAWER', payload: true })

    return () => {
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
      uiDispatch({ type: 'SET_DRAWER', payload: false })
    }
  }, [uiDispatch])

  const handleTabClick = tab_data => {
    setTab(tab_data)
    uiDispatch({ type: 'SET_DRAWER', payload: false })
  }

  const ListContents = (
    <>
      <List>
        <ListItem
          button
          onClick={() => handleTabClick('general')}
          style={{
            backgroundColor: tab === 'general' ? (uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)') : null,
          }}
        >
          <ListItemIcon>
            <PersonOutline />
          </ListItemIcon>
          <ListItemText primary="General" />
        </ListItem>
        <ListItem
          style={{
            backgroundColor:
              tab === 'security_and_login' ? (uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)') : null,
          }}
          button
          onClick={() => handleTabClick('security_and_login')}
        >
          <ListItemIcon>
            <SecurityOutlined />
          </ListItemIcon>
          <ListItemText primary="Security and Login" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          style={{
            backgroundColor: tab === 'location' ? (uiState.darkMode ? 'rgb(76,76,76)' : 'rgb(235,237,240)') : null,
          }}
          button
          onClick={() => handleTabClick('location')}
        >
          <ListItemIcon>
            <LocationCityOutlined />
          </ListItemIcon>
          <ListItemText primary="Location" />
        </ListItem>
      </List>
    </>
  )

  return (
    <Container
      style={{
        paddingTop: '100px',
        paddingBottom: '100px',
        minHeight: '100vh',
      }}
    >
      {!uiState.mdScreen && <DrawerBar>{ListContents}</DrawerBar>}
      <Grid style={{ minHeight: '70vh' }} container spacing={1}>
        {uiState.mdScreen && (
          <Grid item md={4}>
            <Paper style={{ padding: '8px', height: '100%' }}>{ListContents}</Paper>
          </Grid>
        )}
        <Grid item md={8} xs={12} sm={12}>
          <Paper style={{ padding: '16px', width: '100%', height: '100%' }}>
            <Suspense fallback={<Typography>Loading</Typography>}>
              {tab === 'general' && <General />}
              {tab === 'security_and_login' && <SecurityAndLogin />}
              {tab === 'location' && <Location />}
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
