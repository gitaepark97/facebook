import { useGoogleMaps } from 'react-hook-google-maps'

export default function GoogleMap({ coords, zoom = 17 }) {
  const { ref } = useGoogleMaps('AIzaSyBMZsZfaghR7UAmCwaNU4fHrnFfn7lYtFw', {
    center: coords,
    zoom,
  })
  return <div ref={ref} style={{ width: '100%', height: '400px' }} />
}
