import { useState } from 'react'
import axios from 'axios'

export default function useLocationService() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const getLocation = () => {
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      position => {
        getCityAndCountry(position)
      },
      err => {
        locationError(err)
      },
      { timeout: 7000 }
    )
  }

  const getCityAndCountry = position => {
    let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
    axios
      .get(apiUrl)
      .then(result => {
        locationSuccess(result.data)
      })
      .catch(err => {
        locationError(err)
      })
  }

  const locationSuccess = result => {
    setData({
      city: result?.city,
      country: result?.country,
      lat: result?.latt,
      lng: result?.longt,
      region: result?.region,
      state: result?.state,
      timezone: result?.timezone,
    })
    setLoading(false)
  }

  const locationError = err => {
    setError('Could not find location . Enter location manually')
    console.log(err)
    setLoading(false)
  }

  return {
    loading,
    data,
    error,
    getLocation,
    setError,
  }
}
