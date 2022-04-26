import '../App.css'
import TopCommentsBox from '../components/Comments/TopCommentsBox'
import MessageScroll from '../components/Comments/MessageScroll'
// Main Context
import { ContextProvider } from '../components/Comments/Context'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../components/Comments/CommentsBox.css'
import postService from '../services/posts'
import PostQuestion from './postQuestion'


function PostAnswer() {
  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [notification, setNotification] = useState(null)
  const [solved, setSolved] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)


  let navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)
      postService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      postService.getSinglePost(params._id).then((response) => {
        setPost(response)
        setSolved(response.solved)
        //If this post is from the user logged in, show delete and solve buttons
        if (response.author.id === userData.user._id) {
          setShowDelete(true)
        }
      })
    }
  }, [params, params._id, userData])

  const getDate = () => {
    if (post) {
      const date = new Date(post.date)
      return date.toLocaleString()
    }
  }

  //Delete a post
  const handleDelete = () => {
    postService.deletePost(post._id).then((response) => {
      setNotification('Post deleted.')
      setTimeout(() => {
        setNotification(null)
        navigate('/', { replace: true })
      }, 3000)
    })
  }

  const handlePostSolved = () => {
    postService.setSolved(post._id).then((response) => {
      setNotification('Post is now marked as solved.')
      setPost(response)
      setSolved(response.solved)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        <p>{message}</p>
      </div>
    )
  }

  const googleLogOut = () => (
    <button
      className="sidebar-btn"
      style={{
        backgroundColor: 'lightgrey',
      }}
      onClick={() => {
        window.localStorage.clear()
        setUserData(null)
        // setPosts([])
      }}
    >
      LOG OUT
    </button>
  )

  const handleBackButton = (event) => {
    event.preventDefault()
    navigate('/')
  }

  const handleEditButton = (event) => {
    setModalOpen(true)
  }

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

  return (
    <>
      <ContextProvider>
        <Notification message={notification} />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>

        <div className="container">
        <div className="big-box">
          <div className="object-box">


                <p>
                  {userData === null && <p>Please Log in to view this page</p>}
                  {post !== null && (
                    <img src={post.image} alt="" className="img-fluid mb20" />
                  )}
                </p>
                <h3>
                  {post !== null && post.title}{' '}
                  {solved === true && (
                    <span
                      class="material-icons"
                      style={{ color: 'green', verticalAlign: 'middle' }}
                    >
                      check_circle
                    </span>
                  )}
                </h3>

                <p>
                  {post !== null && getDate()} &nbsp;
                  {post !== null && post.tags.UI === true && '#UI '}
                  {post !== null &&
                    post.tags.Development === true &&
                    '#Development '}
                  {post !== null && post.tags.Sales === true && '#Sales '}
                  {post !== null && post.tags.General === true && '#General '}
                  {post !== null && post.solved === true && '#Solved '}
                </p>

                <p>{post !== null && post.content}</p>
                <br />
                <div className="ColHolder">
                  {post !== null && (
                    <TopCommentsBox
                      autoFocus={false}
                      userData={userData}
                      post={post}
                    />
                  )}
                  {post !== null && (
                    <MessageScroll userData={userData} post={post} />
                  )}
                </div>


            {showDelete === true && post.solved === false && (
              <button
                className="solvePost-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you wish to mark this post as solved?'
                    )
                  )
                    handlePostSolved()
                }}
              >
                POST SOLVED
              </button>
            )}
            {showDelete === true && (
              <button
                className="editPost-btn"
                onClick={() => {
                  handleEditButton()
                }}
              >
                EDIT POST
              </button>
            )}

            {showDelete === true && (
              <button
                className="deletePost-btn"
                onClick={() => {
                  if (
                    window.confirm('Are you sure you wish to delete this post?')
                  )
                    handleDelete()
                }}
              >
                DELETE POST
              </button>
            )}
          </div>
        </div>
                </div>

        <div class="register-box">
          <h1 class="thick-h">
            PLUS<br></br>REP
          </h1>
          <button class="sidebar-btn" onClick={handleBackButton}>
            BACK TO FEED
          </button>
          {userData !== null && userInfo()}
          {googleLogOut()}
          {modalOpen && <PostQuestion setOpenModal={setModalOpen} isEdit={true} post={post} />}

        </div>

      </ContextProvider>
    </>
  )
}

export default PostAnswer
