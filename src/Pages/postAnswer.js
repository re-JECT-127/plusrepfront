import '../App.css'
import TopCommentsBox from '../components/Comments/TopCommentsBox'
import MessageScroll from '../components/Comments/MessageScroll'
// Main Context
import { ContextProvider } from '../components/Comments/Context'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../components/Comments/CommentsBox.css'
import postService from '../services/posts'

function PostAnswer() {
  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [notification, setNotification] = useState(null)

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
    postService.getSinglePost(params._id).then((response) => {
      setPost(response)

      //If this post is from the user logged in, show delete and solve buttons
      if (response.author.id === userData.user._id) {
        setShowDelete(true)
      }
    })
  }, [params, params._id, userData])

  const getDate = () => {
    if (post) {
      const date = new Date(post.date)
      return date.toLocaleString()
    }
  }

  //Delete a post
  const handleDelete = (event) => {
    postService.deletePost(post._id).then((response) => {
      setNotification('Post deleted.')
      setTimeout(() => {
        setNotification(null)
        navigate('/', { replace: true })
      }, 3000)
    })
  }

  const handlePostSolved = (event) => {
    event.preventDefault()
    postService.setSolved(post._id).then((response) => {
     setNotification('Post is now marked as solved.')
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

        <div className="container">
          <div className="object-box">
            <div className="row bootstrap snippets bootdeys">
              <div className="col-md-8 col-sm-12">
                <p>
                  {userData === null && <p>Please Log in to view this page</p>}
                  {post !== null && (
                    <img src={post.image} alt="" className="img-fluid mb20" />
                  )}
                </p>
                <h3>{post !== null && post.title}</h3>

                <p>
                  {post !== null && getDate()} &nbsp;
                  {post !== null && post.tags.UI === true && '#UI '}
                  {post !== null &&
                    post.tags.Development === true &&
                    '#Development '}
                  {post !== null && post.tags.Sales === true && '#Sales '}
                  {post !== null && post.tags.General === true && '#General '}
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
              </div>
            </div>
            {showDelete === true && (
              <button className="solvePost-btn" onClick={handlePostSolved}>
                POST SOLVED
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
      </ContextProvider>
    </>
  )
}

export default PostAnswer
