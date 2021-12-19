import useStyles from './styles'
import { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Home, HomeOutlined, Person, PersonOutlined } from '@material-ui/icons'

export default function MiddleMenu() {
  const classes = useStyles()
  const location = useLocation()

  return (
    <Fragment>
      <Button className={classes.buttonItemMiddle} activeClassName={classes.activeBtn} component={NavLink} to="/home">
        {location.pathname === '/home' ? (
          <Home style={{ color: 'rgb(0,113,243)' }} fontSize="large" />
        ) : (
          <HomeOutlined fontSize="large" />
        )}
      </Button>
      <Button
        className={classes.buttonItemMiddle}
        activeClassName={classes.activeBtn}
        component={NavLink}
        to="/friends"
      >
        {location.pathname === '/friends' ? (
          <Person style={{ color: 'rgb(0,113,243)' }} fontSize="large" />
        ) : (
          <PersonOutlined fontSize="large" />
        )}
      </Button>
    </Fragment>
  )
}
