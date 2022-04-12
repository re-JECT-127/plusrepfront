import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'
const uploadImageUrl = 'http://localhost:3001/upload'


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

const getSinglePost = (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(`${baseUrl}/${id}`, config)

  return request.then((response) => {
    console.log(response.data)
    return response.data
  })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}

const uploadImage = (image) => {
  const request = axios.post(uploadImageUrl, image)
  return request.then((response) => response.data)
}






export default { getAll, setToken, create, getSinglePost, uploadImage }
