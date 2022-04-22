import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/stats/'

const getUsers = () => {
  const request = axios.get(baseUrl + 'users')

  return request.then((response) => {
    console.log(response.data)
    return response.data
  })
}

const getPosts = () => {
     const request = axios.get(baseUrl + 'posts')
   
     return request.then((response) => {
       console.log(response.data)
       return response.data
     })
   }

   const getComments = () => {
     const request = axios.get(baseUrl + 'comments')
   
     return request.then((response) => {
       console.log(response.data)
       return response.data
     })
   }





export default { getUsers, getPosts, getComments }
