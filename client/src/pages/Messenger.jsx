import { useContext, useEffect } from 'react'
import { ChatContext, UIContext } from '../App'
import Messages from '../components/Chat/Messages'
import DrawerBar from '../components/Navbar/DrawerBar'
import Friends from '../components/Chat/Friends'
import MessageTextArea from '../components/Chat/MessageTextArea'
import FriendNotSelected from '../components/Chat/FriendNotSelected'
import AvartarText from '../components/UI/AvartarText'
import { Avatar, Container, Grid, Paper, Typography } from '@material-ui/core'

export default function Messenger() {
  const { uiDispatch, uiState } = useContext(UIContext)
  const { chatState, chatDispatch } = useContext(ChatContext)

  useEffect(() => {
    uiDispatch({ type: 'SET_NAV_MENU', payload: true })
    uiDispatch({ type: 'SET_DRAWER', payload: false })

    return () => {
      uiDispatch({ type: 'SET_NAV_MENU', payload: false })
      uiDispatch({ type: 'SET_DRAWER', payload: false })
      chatDispatch({ type: 'SET_SELECTED_FRIEND', payload: null })
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div
      style={{
        paddingTop: '100px',
        paddingBottom: '40px',
        minHeight: '100vh',
      }}
    >
      {!uiState.mdScreen && (
        <DrawerBar>
          <Friends />
        </DrawerBar>
      )}
      <Container>
        <Paper style={{ backgroundColor: uiState.darkMode && 'rgb(36,37,38)' }}>
          <Grid style={{ padding: '16px' }} container justifyContent="center" alignItems="flex-start" spacing={2}>
            {uiState.mdScreen && (
              <Grid
                style={{
                  height: '80vh',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  scrollbarColor: !uiState.darkMode ? '#fff rgb(240,242,245)' : ' rgb(36,37,38) rgb(24,25,26)',
                }}
                item
                md={4}
                xs={12}
                sm={12}
              >
                <Paper elevation={0}>
                  <Friends />
                </Paper>
              </Grid>
            )}
            {chatState.selectedFriend ? (
              <Grid
                style={{
                  height: '80vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 'auto',
                }}
                item
                md={8}
                xs={12}
                sm={12}
              >
                <Paper
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
                  }}
                  elevation={0}
                >
                  {chatState.selectedFriend.profile_pic ? (
                    <Avatar>
                      <img
                        style={{ width: '100%', height: '100%' }}
                        src={chatState.selectedFriend.profile_pic}
                        alt=""
                      />
                    </Avatar>
                  ) : (
                    <AvartarText
                      text={chatState.selectedFriend.name}
                      bg={chatState.selectedFriend.active ? 'seagreen' : 'tomato'}
                    />
                  )}
                  <Typography style={{ marginLeft: '16px' }}>{chatState.selectedFriend.name}</Typography>
                </Paper>
                <Paper
                  style={{
                    padding: '16px',
                    width: '100%',
                    height: '60vh',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarColor: !uiState.darkMode ? '#fff #fff' : ' rgb(36,37,38) rgb(36,37,38)',
                    backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
                  }}
                  elevation={0}
                >
                  <Messages />
                </Paper>
                <div
                  style={{
                    position: 'sticky',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                  }}
                >
                  <MessageTextArea />
                </div>
              </Grid>
            ) : (
              <FriendNotSelected />
            )}
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}
