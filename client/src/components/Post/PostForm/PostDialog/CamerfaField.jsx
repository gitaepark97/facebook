import { useRef, useState } from 'react'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  CardHeader,
  Dialog,
  Grid,
  IconButton,
  Tooltip,
  Container,
  DialogContent,
  Typography,
} from '@material-ui/core'
import { ArrowBack, Camera, Check, Close } from '@material-ui/icons'

export default function CameraField({ setBlob, isImageCaptured, setIsImageCaptured, setPreviewImage, setPostImage }) {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [open, setOpen] = useState(false)

  const initCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoRef.current.srcObject = stream
    })
  }

  const removeCameraImage = () => {
    setIsImageCaptured(false)
    initCamera()
  }

  const disableCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    }
  }

  const handleOpenCameraDialog = () => {
    initCamera()
    setOpen(true)
  }

  const handleCloseCameraDialog = () => {
    disableCamera()
    setOpen(false)
  }

  const addImageToPost = () => {
    canvasRef.current.toBlob(blob => {
      setPostImage(false)
      setPreviewImage('')
      setBlob(blob)
    })
    disableCamera()
    setOpen(false)
  }

  const handleCapture = () => {
    let video = videoRef.current
    let canvas = canvasRef.current
    let context = canvas.getContext('2d')

    canvas.width = video.getBoundingClientRect().width
    canvas.height = video.getBoundingClientRect().height
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    setIsImageCaptured(true)
    disableCamera()
  }

  return (
    <>
      <Tooltip title="Click image from camera" arrow placement="bottom">
        <IconButton onClick={handleOpenCameraDialog}>
          <FontAwesomeIcon icon={faCamera} color="rgb(24,119,242)" />
        </IconButton>
      </Tooltip>
      <Dialog
        style={{ width: '100%' }}
        disableEscapeKeyDown
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={open}
        onClose={handleCloseCameraDialog}
      >
        <CardHeader
          avatar={
            <IconButton onClick={handleCloseCameraDialog}>
              <ArrowBack />
            </IconButton>
          }
          subheader={
            <Typography style={{ fontWeight: '800', fontSize: '20px' }}>Click image from your camera</Typography>
          }
        />
        <DialogContent>
          <Container>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={12} md={12}>
                <video style={{ display: isImageCaptured ? 'none' : 'block', width: '100%' }} ref={videoRef} autoPlay />
                <canvas style={{ display: isImageCaptured ? 'block' : 'none' }} ref={canvasRef} height="240" />
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
                  {isImageCaptured ? (
                    <>
                      <IconButton onClick={removeCameraImage} size="medium">
                        <Avatar style={{ background: 'tomato', color: 'white' }}>
                          <Close />
                        </Avatar>
                      </IconButton>
                      <IconButton onClick={addImageToPost} size="medium">
                        <Avatar style={{ background: 'seagreen', color: 'white' }}>
                          <Check />
                        </Avatar>
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={handleCapture} color="primary" size="medium">
                      <Avatar style={{ background: 'teal', color: 'white' }}>
                        <Camera />
                      </Avatar>
                    </IconButton>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  )
}
