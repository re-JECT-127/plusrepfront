import '../App.css'
import { useState, useEffect, useCallback } from 'react'
import TextForm from '../components/textForm'
import postService from '../services/posts'
import { useNavigate } from 'react-router-dom'
import '../Modal.css'
import Resizer from 'react-image-file-resizer'

function PostQuestion({ setOpenModal }) {
  const [newPost, setNewPost] = useState('')
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)
  const [notification, setNotification] = useState(null)
  const [image, setImage] = useState(null)
  const [selectedTags, setSelectedTags] = useState({
    UI: false,
    Development: false,
    Sales: false,
    General: false,
  })

  const navigate = useNavigate()

  const TagButton = ({ tag, text }) => {
    const [buttonColor, setButtonColor] = useState(tag)

    const handleTagChange = () => {
      let newTags = selectedTags
      if (text === 'UI') {
        newTags.UI = !newTags.UI
        setSelectedTags(newTags)
        console.log(selectedTags)
      }
      if (text === 'Development') {
        newTags.Development = !newTags.Development
        setSelectedTags(newTags)
        console.log(selectedTags)
      }
      if (text === 'Sales') {
        newTags.Sales = !newTags.Sales
        setSelectedTags(newTags)
        console.log(selectedTags)
      }
      if (text === 'General') {
        newTags.General = !newTags.General
        setSelectedTags(newTags)
        console.log(selectedTags)
      }
    }

    return (
      <>
        <button
          style={{
            backgroundColor:
              buttonColor === true ? 'rgb(246, 202, 53)' : 'lightgrey',
            margin: 2,
            borderRadius: 4,
            border: 'none',
            padding: '7px  14px',
            display: 'inline-block',
            textAlign: 'center',
          }}
          onClick={() => {
            handleTagChange()
            setButtonColor(!buttonColor)
          }}
        >
          {text}
        </button>
      </>
    )
  }

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

    const formData = new FormData()

    var taggers = JSON.stringify({
      UI: false,
      Development: false,
      Sales: false,
      General: false,
    })

    if (selectedFile) {
      formData.append('file', selectedFile, selectedFile.name)
    }
    formData.append('author', userData.user._id)
    formData.append('title', 'hardcoded test title')
    formData.append('content', newPost)
    formData.append('UI', selectedTags.UI)
    formData.append('Development', selectedTags.Development)
    formData.append('Sales', selectedTags.Sales)
    formData.append('General', selectedTags.General)

    postService
      .create(formData)
      .then((returnedObject) => {
        setNotification('Post successful!')
        setTimeout(() => {
          setNotification(null)
          setOpenModal(false)
          window.location.reload(false)
        }, 3000)
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
    setNewPost(event.target.value)
  }

  //Handle image select
  const changeHandler = (event) => {
    //If image is too large, resize it.
    if (event.target.files[0].size < 500000) {
      setSelectedFile(event.target.files[0])
      onImageChange(event)
    } else {
      onChange(event)
    }
    setIsFilePicked(true)
  }

  //Resize image
  const onChange = async (event) => {
    try {
      const file = event.target.files[0]
      const image = await resizeFile(file)
      setSelectedFile(image)
      onImageChange(event)
      console.log('onchange image', image)
    } catch (err) {
      console.log(err)
    }
  }

  //Resize image
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1920,
        1080,
        'JPEG',
        50,
        0,
        (uri) => {
          resolve(uri)
        },
        'file'
      )
    })

  //Set image for preview
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
    }
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
      <div className="modalBackground">
        <div className="modalContainer">
          <Notification message={notification} />
          <Error message={error} />

          <div>
            <div>
              <div>
                <div>
                  <ul>
                    <li>
                      <div>
                        <input
                          type="file"
                          name="file"
                          onChange={changeHandler}
                        />

                        {isFilePicked ? (
                          <div>
                            <img src={image} alt="preview" />
                          </div>
                        ) : (
                          <p>Select a file to show details</p>
                        )}
                        <p>Select tags:</p>
                        <TagButton
                          tag={selectedTags.UI}
                          text={'UI'}
                        ></TagButton>
                        <TagButton
                          tag={selectedTags.Development}
                          text={'Development'}
                        ></TagButton>
                        <TagButton
                          tag={selectedTags.Sales}
                          text={'Sales'}
                        ></TagButton>
                        <TagButton
                          tag={selectedTags.General}
                          text={'General'}
                        ></TagButton>
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
                  <button
                    onClick={() => {
                      setOpenModal(false)
                    }}
                    id="cancelBtn"
                  >
                    Cancel
                  </button>
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
        </div>
      </div>
    </>
  )
}

export default PostQuestion
