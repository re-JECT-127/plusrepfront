import '../App.css'
import { useState, useEffect } from 'react'
import TextForm from '../components/textForm'
import postService from '../services/posts'
import userService from '../services/users'

import '../Modal.css'
import Resizer from 'react-image-file-resizer'

function PostQuestion({ setOpenModal, isEdit, post }) {
  const [newPost, setNewPost] = useState('')
  const [newTitle, setNewTitle] = useState('')
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

  useEffect(() => {
    if (isEdit) {
      console.log('post', post)
      setNewPost(post.content)
      setNewTitle(post.title)

      if (post.image !== null) {
        setImage(post.image)
        setIsFilePicked(true)
      }
      setSelectedTags(post.tags)
    }
  }, [isEdit, post])

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

    //Check if there is tag selected
    let tagCheckBoolean = false
    for (let [key, value] of Object.entries(selectedTags)) {
      console.log(key, value)
      if (value) tagCheckBoolean = true
    }

    //If tag is selected, submit post. Otherwise error notification
    if (tagCheckBoolean) {
      const formData = new FormData()

      formData.append('title', newTitle)
      formData.append('content', newPost)
      formData.append('author', userData.user._id)
      formData.append('UI', selectedTags.UI)
      formData.append('Development', selectedTags.Development)
      formData.append('Sales', selectedTags.Sales)
      formData.append('General', selectedTags.General)
      if (selectedFile) {
        formData.append('file', selectedFile, selectedFile.name)
      }

      if (isEdit) {
        userService.updateTags(post.tags.id, selectedTags)
        const updateObject = {
          title: newTitle,
          content: newPost,
        }

        postService
          .updatePost(post.id, updateObject)
          .then((returnedObject) => {
            console.log('updateObject', returnedObject)
            setNotification('Post edited successfully!')
            setTimeout(() => {
              setNotification(null)
              setOpenModal(false)
              window.location.reload(false)
            }, 3000)
          })
          .catch((error) => {
            setError('Failed to send post.')
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
        setNewPost('')
        setNewTitle('')
      } else {
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
            setError('Failed to send post.')
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
        setNewPost('')
        setNewTitle('')
      }
    } else {
      setError('Please select atleast one tag.')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handlePostChange = (event) => {
    setNewPost(event.target.value)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  //Handle image select
  const changeHandler = (event) => {
    //If image over 3MB, send error message
    if (event.target.files[0].size > 3000000) {
      setError('Image max. filesize is 3MB')
      setTimeout(() => {
        setError(null)
      }, 5000)
    } else {
      //If image is large, resize it.
      if (event.target.files[0].size < 500000) {
        setSelectedFile(event.target.files[0])
        onImageChange(event)
      } else {
        onChange(event)
      }
      setIsFilePicked(true)
    }
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

  //Successful Message
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
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>
      <div className="modalBackground">
        <div className="modalContainer">
          <h1 className="thick-h">Submit a question</h1>

                {isFilePicked ? (
                  <div>
                    <img src={image} alt="preview" />
                  </div>
                ) : (
                  <div>
                  <input
                  type="file"
                  name="file"
                  id="upload"
                  hidden
                  onChange={changeHandler}
                />

              <label className="label" for="upload">
                <i className="material-icons">upload_file</i>
                <p>Select image file</p>
              </label>
            </div>
          )}

          <ul>
            <li>
              <p>Select tags:</p>
              <TagButton tag={selectedTags.UI} text={'UI'}></TagButton>
              <TagButton
                tag={selectedTags.Development}
                text={'Development'}
              ></TagButton>
              <TagButton tag={selectedTags.Sales} text={'Sales'}></TagButton>
              <TagButton
                tag={selectedTags.General}
                text={'General'}
              ></TagButton>
            </li>
          </ul>
          <div className="postquestion-textform">
            <TextForm
              onSubmit={addPost}
              titleValue={newTitle}
              titleChange={handleTitleChange}
              postValue={newPost}
              postChange={handlePostChange}
            />
            <button
              onClick={() => {
                setOpenModal(false)
              }}
              id="cancelBtn"
            >
              {' '}
              Cancel{' '}
            </button>
          </div>
          <Notification message={notification} />
          <Error message={error} />
        </div>
      </div>
    </>
  )
}

export default PostQuestion