import { useState, useEffect } from 'react'
import '../App.css'
import postService from '../services/posts'
import Post from '../components/Post'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

function Login() {
  const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState(null)

  //Fetch userData from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)
      postService.setToken(user.token)
    }
  }, [])

  //Fetch all Posts
  useEffect(() => {
    postService.getAll().then((posts) => {
      setPosts(posts)
    })
  }, [])

  //Response when Google loggin success
  const responseSuccessGoogle = (response) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/googlelogin',
      data: { tokenId: response.tokenId },
    }).then((response) => {
      postService.setToken(response.data.token)
      console.log('Google login success', response.data)
      window.localStorage.setItem('loggedUser', JSON.stringify(response.data))
      setUserData(response.data)

      postService.getAll().then((posts) => {
        setPosts(posts)
      })
    })
  }

  const responseErrorGoogle = (response) => {}

  const googleLogin = () => (
    <GoogleLogin
      clientId="674340090612-qkluit3qj5vngsedm6l0rk12lk6g41bp.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseSuccessGoogle}
      onFailure={responseErrorGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )

  //Wipe local storage and userData
  const googleLogOut = () => (
    <button
      onClick={() => {
        window.localStorage.clear()
        setUserData(null)
        setPosts([])
      }}
    >
      Logout
    </button>
  )

  const userInfo = () => (
    <div>
      <img
        src={userData.user.picture}
        alt="profile"
        referrerPolicy="no-referrer"
      />
      <p>{userData.user.name}</p>
      <p>{userData.user.email}</p>
    </div>
  )

  return (
    <body class="flex-container">
      <div class="big-box">
        {posts.map((post) => (
          <Post content={post.content} key={posts.indexOf(post)} />
        ))}
      </div>

      <div class="register-box">
        {userData !== null && userInfo()}
        {userData === null ? googleLogin() : googleLogOut()}
      </div>
    </body>
  )
}

export default Login
