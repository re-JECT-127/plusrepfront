import { useState, useEffect } from 'react'
import '../App.css'
import postService from '../services/posts'
import Post from '../components/Post'
import PostQuestion from './postQuestion'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import TagButton from '../components/Profile/TagButton'

function Login() {
  const [posts, setPosts] = useState([])
  const [userData, setUserData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

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
      LOG OUT
    </button>
  )

  const userInfo = () => (
    <div>
      <img
        style={{
          margin: 15,
          marginTop: 100,
          borderRadius: 5,
          justifyContent: 'center',
        }}
        src={userData.user.picture}
        alt="profile"
        referrerPolicy="no-referrer"
      />
      <p
        style={{
          margin: 15,
          fontSize: 20,
          fontFamily: 'Lato,sans-serif,Arial,Helvetica',
        }}
      >
        {userData.user.name}
      </p>
    </div>
  )

  const handleSubmitButton = (event) => {
    event.preventDefault()
    setModalOpen(true)
  }

  const filterTags = (post) => {
    let tagsBoolean = false
    if (post.tags) {
      if (post.tags.UI && userData.user.tags[0].UI) {
        tagsBoolean = true
      }
      if (post.tags.Development && userData.user.tags[0].Development) {
        tagsBoolean = true
      }
      if (post.tags.General && userData.user.tags[0].General) {
        tagsBoolean = true
      }
      if (post.tags.Sales && userData.user.tags[0].Sales) {
        tagsBoolean = true
      }
    }
    return tagsBoolean
  }

  const createTagButtons = (tags) => {
    const tagButtonArray = Object.entries(tags).filter((key) => {
      if (
        key[0] === 'UI' ||
        key[0] === 'Development' ||
        key[0] === 'Sales' ||
        key[0] === 'General'
      ) {
        const newObj = { [key[0]]: key[1] }
        return newObj
      }
    })
    return tagButtonArray
  }

  return (
    <body class="flex-container">
      <div class="phone-nav-box">
      {userData !== null && (
          <button class="sidebar-btn" onClick={handleSubmitButton}>
            SUBMIT QUESTION
          </button>
        )}
        {userData !== null && <p>Filter Tags:</p>}
        {userData !== null &&
          createTagButtons(userData.user.tags[0]).map((tag) => (
            <TagButton
              className="sidebar-btn"
              key={tag[0]}
              text={tag[0]}
              tag={tag}
              userData={userData}
              onTagChange={setUserData}
            />
          ))}
        {userData === null ? googleLogin() : googleLogOut()}
        {modalOpen && <PostQuestion setOpenModal={setModalOpen} />}
      </div>
      <div class="big-box">
    
        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            if (filterTags(post))
              return <Post post={post} key={posts.indexOf(post)} />
          })}

        {userData === null && (
          <div className="object-box">
            <h1 className="object-header">
              {' '}
              Please login with your Google Account
            </h1>
            <div className="object-content">
              <p className="object-text">
                In this site you can ask questions and opinions from your
                co-workers <strong>anonymous</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="register-box">
        <h1 className="thick-h">
          PLUS<br></br>REP
        </h1>
        {userData !== null && (
          <button className="sidebar-btn" onClick={handleSubmitButton}>
            SUBMIT QUESTION
          </button>
        )}
        {userData !== null && (
          <p style={{ marginLeft: 10, marginTop: 50 }}>Filter Tags:</p>
        )}
        {userData !== null &&
          createTagButtons(userData.user.tags[0]).map((tag) => (
            <TagButton
              className="sidebar-btn"
              key={tag[0]}
              text={tag[0]}
              tag={tag}
              userData={userData}
              onTagChange={setUserData}
            />
          ))}
        {userData !== null && userInfo()}
        {userData === null ? googleLogin() : googleLogOut()}
        {modalOpen && <PostQuestion setOpenModal={setModalOpen} />}
      </div>
    </body>
  )
}

export default Login
