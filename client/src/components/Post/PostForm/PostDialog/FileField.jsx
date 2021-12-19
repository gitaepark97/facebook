import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Tooltip } from '@material-ui/core'

export default function FileField({ fileRef }) {
  const handleImageClick = event => {
    event.preventDefault()
    fileRef.current.click()
  }

  return (
    <Tooltip title="Select image from device" arrow placement="bottom">
      <IconButton onClick={handleImageClick}>
        <FontAwesomeIcon icon={faImage} color="rgb(73, 189, 99)" />
      </IconButton>
    </Tooltip>
  )
}
