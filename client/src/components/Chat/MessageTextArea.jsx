import { useContext, useState } from 'react'
import { UIContext } from '../../App'
import useSendMessage from '../../hooks/useSendMessage'
import { IconButton, InputBase, Paper, makeStyles } from '@material-ui/core'
import { Send } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  inputRoot: {
    padding: '16px 8px 16px 8px',
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: '4px',
  },
}))

export default function MessageTextArea() {
  const { uiState } = useContext(UIContext)
  const classes = useStyles()
  const [textMessage, setTextMessage] = useState('')
  const { sendMessage } = useSendMessage({ textMessage, setTextMessage })

  const handleSendMessage = event => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <Paper
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        width: '100%',
        backgroundColor: uiState.darkMode && 'rgb(36,37,38)',
      }}
      elevation={0}
    >
      <InputBase
        style={{
          borderRadius: '20px 20px 20px 20px',
          backgroundColor: uiState.darkMode ? 'rgb(24,25,26)' : 'whitesmoke',
          width: '100%',
        }}
        value={textMessage}
        onChange={event => setTextMessage(event.target.value)}
        placeholder="Enter Your Text..."
        multiline
        maxRows={4}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      <IconButton
        style={{
          backgroundColor: 'rgb(1,133,243)',
          color: '#fff',
          marginLeft: '16px',
        }}
        onClick={handleSendMessage}
      >
        <Send fontSize="small" />
      </IconButton>
    </Paper>
  )
}
