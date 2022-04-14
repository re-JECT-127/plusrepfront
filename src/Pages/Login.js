import { useState, useEffect } from 'react'
import '../App.css'
import postService from '../services/posts'
import Post from '../components/Post'
import PostQuestion from './postQuestion'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

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
    postService.getAll().then((posts) => setPosts(posts))
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
        console.log(posts)
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
      className="sidebar-btn"
      style={{
        backgroundColor: 'lightgrey',
      }}
      onClick={() => {
        window.localStorage.clear()
        setUserData(null)
        setPosts([])
      }}
    >
      LOGOUT
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
    </div>
  )

  const handleProfileButton = (event) => {
    event.preventDefault()
    navigate('/profile')
  }

  const handleSubmitButton = (event) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const filterTags = (post) => {
    let tagsBoolean = false
    if (post.tags) {
      if (post.tags.UI && userData.user.tags[0].UI) {
        console.log('ui true')
        tagsBoolean = true
      }
      if (post.tags.Development && userData.user.tags[0].Development) {
        console.log('dev true')
        tagsBoolean = true
      }
      if (post.tags.General && userData.user.tags[0].General) {
        console.log('general true')
        tagsBoolean = true
      }
      if (post.tags.Sales && userData.user.tags[0].Sales) {
        console.log('sales true')
        tagsBoolean = true
      }
    }
    return tagsBoolean
  }

  return (
    <body class="flex-container">
      <div class="big-box">
        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            if (filterTags(post))
              return <Post post={post} key={posts.indexOf(post)} />
          })}

        <div class="object-box">
          <h1 class="object-header"> LIPSUM </h1>
          <div class="object-content">
            <p class="object-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
              <img
                class="object-img"
                src="https://media.discordapp.net/attachments/694816042790289439/960851332221263902/upyours.jpg?width=608&height=608"
                alt="up yours"
              ></img>
            </p>
          </div>
          <div class="button-box">
            <input type="button" class="btn" value="Comment"></input>
            <input type="button" class="btn" value="Share"></input>
          </div>
        </div>
      </div>

      <div class="register-box">
        <h1 class="thick-h">
          PLUS<br></br>REP
        </h1>
        {userData !== null && (
          <button class="sidebar-btn" onClick={handleSubmitButton}>
            SUBMIT QUESTION
          </button>
        )}
        {userData !== null && (
          <button class="sidebar-btn" onClick={handleProfileButton}>
            PROFILE{' '}
          </button>
        )}
        {userData !== null && userInfo()}
        {userData === null ? googleLogin() : googleLogOut()}
        {modalOpen && <PostQuestion setOpenModal={setModalOpen} />}
      </div>
    </body>
  )
}

export default Login
