import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute({ component: Component, isLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isLoggedIn) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
      }}
    />
  )
}
