import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { UserContext, UIContext } from '../App'
import { useHistory } from 'react-router-dom'
import { fetchCurrentUser } from '../services/AuthService'

const url = process.env.REACT_APP_ENDPOINT

export default function useLoginUser(userData = null) {
  const { uiDispatch } = useContext(UIContext)
  const { userDispatch } = useContext(UserContext)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialState, setInitialState] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    setInitialState({ ...initialState, email: userData ? userData.email : '' })

    return () => {}
    //eslint-disable-next-line
  }, [])

  const handlePasswordChange = event => {
    setInitialState({ ...initialState, password: event.target.value })
    setError({ ...error, password: '' })
  }

  const handleEmailChange = event => {
    setInitialState({ ...initialState, email: event.target.value })
    setError({ ...error, email: '' })
  }

  const handleLoginUser = async event => {
    event.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post(`${url}/api/auth/login`, initialState)
      const me = await fetchCurrentUser()

      localStorage.setItem('token', JSON.stringify(data.data.token))
      setLoading(false)
      userDispatch({ type: 'SET_CURRENT_USER', payload: me.data.user })
      uiDispatch({ type: 'SET_MESSAGE', payload: { display: true, text: data.message, color: 'success' } })
      history.push('/home')
    } catch (err) {
      setLoading(false)

      if (err && err.response) {
        if (err.response.status === 422) {
          setError({ ...err.response.data.error })
        }
        if (err.response.status === 400) {
          uiDispatch({
            type: 'SET_MESSAGE',
            payload: {
              display: true,
              text: err.response.data.error,
              color: 'error',
            },
          })
        }
      }
    }
  }

  return {
    loading,
    error,
    handleLoginUser,
    handleEmailChange,
    handlePasswordChange,
  }
}
