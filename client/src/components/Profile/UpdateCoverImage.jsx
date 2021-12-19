import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import useUpdateProfilePic from '../../hooks/useUpdateProfilePic'
import DialogLoading from '../UI/DialogLoading'
import { Avatar, Button, DialogActions, DialogTitle, IconButton, Dialog, DialogContent } from '@material-ui/core'
import { CameraAlt as CameraIcon } from '@material-ui/icons'

export default function UpdateCoverImage() {
  const history = useHistory()
  const [coverPic, setCoverPic] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [menu, setMenu] = useState(false)
  const inputFileRef = useRef(null)

  const { updateCoverPic, loading } = useUpdateProfilePic({
    cover_pic: coverPic,
    history,
  })

  const handleImageChange = event => {
    setCoverPic(event.target.files[0])
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result)
      setMenu(true)
    }
  }

  const handleImageClick = () => {
    inputFileRef.current.click()
  }

  const handleUpload = () => {
    updateCoverPic()
    handleCancel()
  }

  const handleCancel = () => {
    setCoverPic(null)
    setPreviewImage(null)
    setMenu(false)
  }

  return (
    <div>
      <IconButton style={{ position: 'absolute', bottom: 30, left: 20, zIndex: 2 }} onClick={handleImageClick}>
        <Avatar>
          <CameraIcon style={{ color: 'blue' }} />
        </Avatar>
      </IconButton>
      {loading && <DialogLoading loading={loading} text="Uploading Cover  Pic..." />}
      <input style={{ display: 'none' }} type="file" accept="image/*" ref={inputFileRef} onChange={handleImageChange} />
      <Dialog
        style={{ width: '100%' }}
        disableEscapeKeyDown
        fullWidth
        scroll="body"
        maxWidth="sm"
        open={menu}
        onClose={() => setMenu(false)}
      >
        <DialogTitle>Cover Picture</DialogTitle>
        <DialogContent>{previewImage && <img src={previewImage} width="100%" height="400px" alt="" />}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleUpload} color="primary">
            Upload
          </Button>
          <Button style={{ backgroundColor: 'tomato', color: '#fff' }} variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
