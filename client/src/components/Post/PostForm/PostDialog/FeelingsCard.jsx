import { useState } from 'react'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
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

export default function FeelingsCard({ body, setBody }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Tooltip title="Share feelings with post" arrow placement="bottom">
        <IconButton onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faSmile} color="rgb(250, 199, 94)" />
        </IconButton>
      </Tooltip>
      <Dialog
        style={{ width: '100%' }}
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
          subheader={<Typography style={{ fontWeight: '800', fontSize: '20px' }}>Express your feelings</Typography>}
        />
        <DialogContent>
          <Container>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={10} md={8}>
                <TextField
                  style={{ width: '100%' }}
                  label="Add Feelings"
                  variant="outlined"
                  value={body.feelings}
                  onChange={event => setBody({ ...body, feelings: event.target.value })}
                />
                <Button
                  style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Add feelings
                </Button>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}
