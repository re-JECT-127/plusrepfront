import '../App.css'
import TopCommentsBox from '../components/Comments/TopCommentsBox'
import MessageScroll from '../components/Comments/MessageScroll'
// Main Context
import { ContextProvider } from '../components/Comments/Context'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../components/Comments/CommentsBox.css'
import postService from '../services/posts'

function PostAnswer() {
  const [userData, setUserData] = useState(null)
  const [post, setPost] = useState(null)

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
    })
  }, [params, params._id])

  const getDate = () => {
    if (post) {
      const date = new Date(post.date)
      return date.toLocaleString()
    }
  }

  return (
    <>
      <ContextProvider>
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
                          <img
                            src={post.image}
                            alt=""
                            className="img-fluid mb20"
                          />
                        )}
                      </p>
                      <h3>{post !== null && post.title}</h3>

                          <p>
                            {post !== null && getDate()} &nbsp;
                            {post !== null && post.tags.UI === true && '#UI '}
                            {post !== null &&
                              post.tags.Development === true &&
                              '#Development '}
                            {post !== null &&
                              post.tags.Sales === true &&
                              '#Sales '}
                            {post !== null &&
                              post.tags.General === true &&
                              '#General '}
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
                </div>
              </div>
      </ContextProvider>
    </>
  )
}

export default PostAnswer
