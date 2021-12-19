import { useContext, useState } from 'react'
import axios from 'axios'
import { PostContext, UIContext } from '../App'

const url = process.env.REACT_APP_ENDPOINT

export default function useCreateComment({ post_id, commentText, setError, setCommentText }) {
  const [loading, setLoading] = useState(false)
  const { postDispatch } = useContext(PostContext)
  const { uiDispatch } = useContext(UIContext)

  const createComment = async () => {
    setLoading(true)

    try {
      let token = JSON.parse(localStorage.getItem('token'))
      const response = await axios.post(
        `${url}/api/post/${post_id}/comment`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.data) {
        setCommentText('')
        postDispatch({ type: 'ADD_POST_COMMENT', payload: response.data.comment })
        uiDispatch({
          type: 'SET_MESSAGE',
          payload: {
            display: true,
            text: response.data.message,
            color: 'success',
          },
        })
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err && err.response) {
        if (err.response.status === 422) {
          setError(err.response.data.error)
        }
        uiDispatch({ type: 'SET_MESSAGE', payload: err.response.data.error })
      }
    }
  }

  return {
    createComment,
    loading,
  }
}
