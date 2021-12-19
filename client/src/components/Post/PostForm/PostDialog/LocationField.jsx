import { useState } from 'react'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  CardHeader,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

export default function LocationField({ body, setBody }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="add your location" arrow placement="bottom">
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faMap} color="rgb(250, 199, 94)" />
        </IconButton>
      </Tooltip>
      <Dialog
        style={{ width: '100%' }}
        disableEscapeKeyDown
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <CardHeader
          avatar={
            <IconButton onClick={() => setOpen(false)}>
              <ArrowBack />
            </IconButton>
          }
          subheader={<Typography style={{ fontWeight: '800', fontSize: '20px' }}>Add your Places</Typography>}
        />
        <DialogContent>
          <Container>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={10} md={10}>
                <TextField
                  style={{ width: '100%' }}
                  label="Add Location"
                  variant="outlined"
                  value={body.at}
                  onChange={event => setBody({ ...body, at: event.target.value })}
                />
                <Button
                  style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
                  onClick={() => setOpen(false)}
                  variant="contained"
                  color="primary"
                >
                  Add location
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}
