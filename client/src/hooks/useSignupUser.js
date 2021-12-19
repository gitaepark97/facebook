import { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { UserContext, UIContext } from '../App'
import { fetchCurrentUser } from '../services/AuthService'

const url = process.env.REACT_APP_ENDPOINT

export default function useSignupUser() {
  const { uiDispatch } = useContext(UIContext)
  const { userDispatch } = useContext(UserContext)
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [initialState, setInitialState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleNameChange = event => {
    setError({ ...error, name: '' })
    setInitialState({ ...initialState, name: event.target.value })
  }

  const handleEmailChange = event => {
    setError({ ...error, email: '' })
    setInitialState({ ...initialState, email: event.target.value })
  }

  const handlePasswordChange = event => {
    setInitialState({ ...initialState, password: event.target.value })
    setError({ ...error, password: '' })
  }

  const handleSignupUser = async event => {
    event.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${url}/api/auth/signup`, initialState)
      localStorage.setItem('token', JSON.stringify(data.data.token))
      const me = await fetchCurrentUser()
      setLoading(false)
      userDispatch({ type: 'SET_CURRENT_USER', payload: me.data.user })
      uiDispatch({
        type: 'SET_MESSAGE',
        payload: { color: 'success', display: true, text: data.message },
      })
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
    handleSignupUser,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
  }
}
