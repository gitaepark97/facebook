import { lazy, useContext, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { UIContext, UserContext } from '../../../../App'
import FileField from './FileField'
import LocationField from './LocationField'
import FeelingsCard from './FeelingsCard'
import DialogLoading from '../../../UI/DialogLoading'
import DialogHeader from './DialogHeader'
import PreviewImage from './PreviewImage'
import useCreatePost from '../../../../hooks/useCreatePost'
import {
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  DialogActions,
  Grid,
  DialogContent,
  Dialog,
  IconButton,
  Avatar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Close } from '@material-ui/icons'

const CameraField = lazy(() => import('./CamerfaField'))

export default function PostFormDialog() {
  const { uiState, uiDispatch } = useContext(UIContext)
  const [blob, setBlob] = useState(null)
  const [postImage, setPostImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [isImageCaptured, setIsImageCaptured] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [body, setBody] = useState({
    feeling: '',
    with: [],
    at: '',
    date: '',
  })
  const [postData, setPostData] = useState({
    privacy: 'Public',
    content: '',
  })
  const { userState } = useContext(UserContext)
  const fileRef = useRef()

  const handleContentChange = event => {
    setPostData({
      ...postData,
      content: event.target.value,
    })
  }

  const handleImageChange = event => {
    setPostImage(event.target.files[0])

    const reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      setBlob(null)
      setIsImageCaptured(false)
      setPreviewImage(reader.result)
    }
  }

  const onEmojiClick = (event, emojiObject) => {
    setPostData({
      ...postData,
      content: postData.content + emojiObject.emoji,
    })
  }

  const handleCloseDialog = () => {
    uiDispatch({ type: 'SET_POST_MODEL', payload: false })
  }

  const removeFileImage = () => {
    setPreviewImage('')
    setPostImage(null)
  }

  const removeCameraImage = () => {
    setBlob(null)
    setIsImageCaptured(false)
  }

  const showCapturedImage = () => {
    if (blob) {
      let blobURL = URL.createObjectURL(blob)

      return (
        <>
          <Alert>
            <b>Image size ({Math.round(blob.size / 1024)} KB)</b>
          </Alert>
          <img style={{ width: '100%', height: '100%' }} src={blobURL} alt="" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px',
              marginBottom: '16px',
            }}
          >
            <IconButton onClick={removeCameraImage} size="medium">
              <Avatar style={{ background: 'tomato', color: 'white' }}>
                <Close />
              </Avatar>
            </IconButton>
          </div>
        </>
      )
    }
  }

  const { handleSubmitPost, loading } = useCreatePost({
    postData,
    body,
    postImage,
    isImageCaptured,
    blob,
  })

  return (
    <div>
      <Typography
        style={{
          color: !uiState.darkMode ? 'grey' : null,
          padding: '8px',
          background: !uiState.darkMode ? 'rgb(240,242,245)' : null,
          borderRadius: '20px',
          cursor: 'pointer',
        }}
        onClick={() => uiDispatch({ type: 'SET_POST_MODEL', payload: true })}
      >
        What's in your mind, {userState.currentUser.name}?
      </Typography>
      {loading ? (
        <DialogLoading loading={loading} text="Uploading post..." />
      ) : (
        <Dialog
          style={{ width: '100%' }}
          disableEscapeKeyDown
          fullWidth
          scroll="body"
          maxWidth="sm"
          open={uiState.postModel}
          onClose={() => uiDispatch({ type: 'SET_POST_MODEL', payload: false })}
        >
          <DialogHeader userState={userState} handleCloseDialog={handleCloseDialog} body={body} />
          <DialogContent>
            <FormControl style={{ marginBottom: '16px' }}>
              <InputLabel>Privacy</InputLabel>
              <Select
                native
                value={postData.privacy}
                onChange={event => setPostData({ ...postData, privacy: event.target.value })}
              >
                <option value={'Only me'}>Only me</option>
                <option value={'Public'}>Public</option>
              </Select>
            </FormControl>
            <TextField
              style={{ background: !uiState.darkMode ? '#fff' : null, border: 'none', width: '100%' }}
              placeholder={`What's in your mind ${userState.currentUser.name}?`}
              multiline
              rows={8}
              value={postData.content}
              onChangeCapture={handleContentChange}
            />
            <Grid style={{ marginTop: '16px', marginBottom: '16px' }} container justifyContent="center">
              <Button variant="contained" color="secondary" size="small" onClick={() => setShowEmoji(!showEmoji)}>
                {showEmoji ? 'Hide emoji panel' : 'Show emoji panel'}
              </Button>
            </Grid>
            <Grid
              style={{ marginTop: '16px', marginBottom: '16px' }}
              container
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} sm={6} md={6}>
                {showEmoji && <EmojiPicker classname="emoji-container" onEmojiClick={onEmojiClick} />}
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6} md={6} container justifyContent="center">
                <FileField fileRef={fileRef} />
                <CameraField
                  setBlob={setBlob}
                  isImageCaptured={isImageCaptured}
                  setIsImageCaptured={setIsImageCaptured}
                  setPreviewImage={setPreviewImage}
                  setPostImage={setPostImage}
                />
                <LocationField body={body} setBody={setBody} />
                <FeelingsCard body={body} setBody={setBody} />
              </Grid>
            </Grid>
            {previewImage && (
              <>
                <Alert>
                  <b>Image size ({Math.round(postImage.size / 1024)} Kb)</b>
                </Alert>
                <PreviewImage previewImage={previewImage} removeFileImage={removeFileImage} />
              </>
            )}
            {showCapturedImage()}
          </DialogContent>
          <DialogActions>
            <Button
              style={{ width: '100%' }}
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmitPost}
            >
              {loading ? (
                <CircularProgress style={{ color: '#fff' }} variant="indeterminate" size={25} />
              ) : (
                'Create Post'
              )}
            </Button>
            <input
              style={{ display: 'none' }}
              type="file"
              ref={fileRef}
              onChange={handleImageChange}
              accept="image/*"
              capture="user"
            />
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}
