import { useState } from 'react'
import { Link } from 'react-router-dom'
import useSearchFriends from '../../hooks/useSearchFriends'
import AvartarText from '../UI/AvartarText'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  ListItem,
  CircularProgress,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'

export default function SearchFriends() {
  const [open, setOpen] = useState(null)
  const [name, setName] = useState('')
  const { searchFriends, friends, loading } = useSearchFriends()

  const handeSearch = () => {
    searchFriends(name)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Search />
      </IconButton>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            style={{ width: '100%' }}
            variant="outlined"
            placeholder="Enter friends name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <Button
            style={{ width: '100%', marginTop: '16px' }}
            variant="contained"
            color="primary"
            onClick={handeSearch}
          >
            Search
          </Button>
          {friends.length ? (
            <Typography style={{ marginTop: '20px' }} variant="h4">
              Search Friends ({friends.length})
            </Typography>
          ) : null}
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {friends &&
                friends.map(user => (
                  <ListItem button onClick={handleClose} component={Link} to={`/profile/${user.id}`} key={user.id}>
                    <ListItemIcon>
                      {user.profile_pic ? (
                        <Avatar style={{ width: '60px', height: '60px' }}>
                          <img src={user.profile_pic} width="100%" height="100%" alt="" />
                        </Avatar>
                      ) : (
                        <AvartarText text={user.name} bg={user.active ? 'seagrenn' : 'tomato'} />
                      )}
                    </ListItemIcon>
                    <ListItemText style={{ marginLeft: '8px' }}>
                      <Typography style={{ fontSize: '17px', fontWeight: '700' }}>{user.name}</Typography>
                      <Typography>{user.email}</Typography>
                    </ListItemText>
                  </ListItem>
                ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
