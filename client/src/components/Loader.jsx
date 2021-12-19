import { Paper, CircularProgress } from '@material-ui/core'

export default function Loader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        dinWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper style={{ padding: '16px' }} elevation={14}>
        <CircularProgress />
      </Paper>
    </div>
  )
}
