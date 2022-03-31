import '../App.css'
import { useState, useEffect } from 'react'
import FileInput from '../components/fileInput'
import TextForm from '../components/textForm'
import postService from '../services/posts'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PostQuestion = () => {
  const [newPost, setNewPost] = useState('')
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  //Load userdata from localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)
      postService.setToken(user.token)
    }
  }, [])

  //Send post to backend
  const addPost = (event) => {
    event.preventDefault()
    console.log(newPost)

    const postObject = {
      author: userData.user._id,
      content: newPost,
    }

    postService
      .create(postObject)
      .then((returnedObject) => {
        setNotification('Post successfull, redirecting back to home.')
        setTimeout(() => {
          setNotification(null)
          navigate('/', { replace: true })
        }, 5000)
      })
      .catch((error) => {
        setError('Failed to send post')
        setTimeout(() => {
          setError(null)
        }, 5000)
      })

    setNewPost('')
  }

  const handlePostChange = (event) => {
    console.log(event.target.value)
    setNewPost(event.target.value)
  }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  const handleImageSubmission = () => {
    const formData = new FormData()
    formData.append('image', selectedFile)
    console.log()
  }

  //Error message
  const Error = ({ message }) => {
    if (message === null) {
      return null
    }
    return <div className="error">{message}</div>
  }

  //Successfull Post message
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return <div className="notification">{message}</div>
  }

  return (
    <>
      <Notification message={notification} />
      <Error message={error} />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="profile.css" />
      <div className="container bootstrap snippets bootdey">
        <div className="row">
          <div className="col-md-offset-3 col-md-6 col-xs-12">
            <div className="well well-sm well-social-post">
              <ul className="list-inline" id="list_PostActions">
                <li className="active">
                  <div>
                    <input type="file" name="file" onChange={changeHandler} />

                    {isFilePicked ? (
                      <div>
                        <p>Filename: {selectedFile.name}</p>

                        <p>Filetype: {selectedFile.type}</p>

                        <p>Size in bytes: {selectedFile.size}</p>
                      </div>
                    ) : (
                      <p>Select a file to show details</p>
                    )}

                    <div>
                      <button onClick={handleImageSubmission}>Submit</button>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#">Add code</a>
                </li>
              </ul>
              <div className="postquestion-textform">
                <TextForm
                  onSubmit={addPost}
                  postValue={newPost}
                  postChange={handlePostChange}
                />
              </div>

              <ul className="list-inline post-actions">
                <li>
                  <a href="#">
                    <span className="glyphicon glyphicon-camera" />
                  </a>
                </li>
                <li>
                  <a href="#" className="glyphicon glyphicon-user" />
                </li>
                <li>
                  <a href="#" className="glyphicon glyphicon-map-marker" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostQuestion
