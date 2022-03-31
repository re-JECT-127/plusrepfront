import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)

  return request.then((response) => {
    console.log(response.data)
    return response.data
  })
}

export default { getAll, setToken }
