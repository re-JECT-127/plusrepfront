import axios from "axios"
const baseUrl = "http://localhost:3001/api/posts"

const getAll = () => {
    console.log('GETTING POSTS')
  const request = axios.get(baseUrl)
  return request.then((response) => {
      console.log(response.data)
    return response.data
  })
}

export default { getAll }
