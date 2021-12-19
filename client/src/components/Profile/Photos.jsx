import { Paper, Grid, Avatar, Typography, Button } from '@material-ui/core'

export default function Photos() {
  return (
    <Paper style={{ padding: '8px' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography>Photos</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" size="small">
            See all
          </Button>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: '16px' }} container spacing={1} alignItems="center" justifyContent="flex-start">
        {[...new Array(6)].map(photo => (
          <Grid item xs={6} sm={6} md={6}>
            <Avatar style={{ width: '100%', height: '100%' }} variant="square">
              <img src="" width="100%" height="100%" alt="" />
            </Avatar>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}
