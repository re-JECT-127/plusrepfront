import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/comments'
/*
let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
*/
const getAll = () => {
 // const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl)

  return request.then((response) => {
    console.log(response.data)
    return response.data
  })
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}




export default { getAll, create }
