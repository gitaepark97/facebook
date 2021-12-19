import { useState } from 'react'
import { Dialog, LinearProgress, Paper, Typography } from '@material-ui/core'

export default function DialogLoading({ loading, text }) {
  const [open, setOpen] = useState(loading)

  return (
    <Dialog
      style={{ width: '100%' }}
      disableEscapeKeyDown
      fullWidth
      scroll="body"
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Paper
        style={{
          width: '100%',
          height: '100%',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'coulmn',
        }}
        elevation={15}
      >
        <Typography style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>{text}</Typography>
        <LinearProgress style={{ width: '50%' }} color="secondary" />
      </Paper>
    </Dialog>
  )
}
