import { Avatar, CardMedia, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default function PreviewImage({ previewImage, removeFileImage }) {
  return (
    <>
      <CardMedia style={{ width: '100', height: '240px' }} image={previewImage} />
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
        <IconButton onClick={removeFileImage} size="medium">
          <Avatar style={{ background: 'tomato', color: 'white' }}>
            <Close />
          </Avatar>
        </IconButton>
      </div>
    </>
  )
}
