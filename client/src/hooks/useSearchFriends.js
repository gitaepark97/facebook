import { useState } from 'react'
import axios from 'axios'

const url = process.env.REACT_APP_ENDPOINT

export default function useSearchFreinds() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(false)

  const searchFriends = async name => {
    try {
      setLoading(true)

      const res = await axios.get(`${url}/api/user/search?name=${name}`)

      setFriends(res.data.users)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return {
    searchFriends,
    friends,
    loading,
  }
}
