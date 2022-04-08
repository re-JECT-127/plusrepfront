import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/users/${id}`, newObject)
  return request.then((response) => response.data)
}

const updateTags = (id, newObject) => {
    const request = axios.put(`${baseUrl}/tags/${id}`, newObject)
    return request.then((response) => response.data)
  }
  
export default { update, updateTags }
