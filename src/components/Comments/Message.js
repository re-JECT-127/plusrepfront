import React, { useRef, useState, useContext, useEffect } from 'react'
import { useMainContext } from './Context'
import './CommentsBox'
import commentsService from '../../services/comments'

const showReply = React.createContext()

export function useOpenReply() {
  return useContext(showReply)
}

function Message(props) {
  const [userData, setUserData] = useState(null)

  const { setMessageUpdate } = useMainContext()

  const likeIcon = useRef()
  const numLikes = useRef()

  const [arrowUp, setArrowUp] = useState(false)
  const [openReply, setOpenReply] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)

      props.userLikes.forEach((userId) => {
        if (userId === user.user._id) {
          likeIcon.current.style.color = 'red'
        }
      })
    }
  }, [props.userLikes])

  //Toggled when CANCEL button and REPLY button are pressed
  const changeOpenReply = () => {
    setOpenReply((prevState) => (prevState = !prevState))
  }

  //Toggle arrow up and down
  let arrow = <i className="fas fa-caret-down"></i>

  const changeArrow = () => {
    setArrowUp((prevState) => (prevState = !prevState))
  }

  if (arrowUp) {
    arrow = <i className="fas fa-caret-up"></i>
  } else {
    arrow = <i className="fas fa-caret-down"></i>
  }

  const likeComment = () => {
    const commentObject = {
      likes: 1,
      user: userData.user._id,
    }

    commentsService
      .updateComment(props.useKey, commentObject)
      .then((result) => {
        console.log('res', result)
        numLikes.current.innerHTML = result.likes
        if (result.userLikes.length === 0) {
          likeIcon.current.style.color = 'grey'
        }

        result.userLikes.forEach((userId) => {
          if (userId === userData.user._id) {
            likeIcon.current.style.color = 'red'
          } else {
            likeIcon.current.style.color = 'grey'
          }
        })
      })
  }

  const deleteMessage = () => {
    fetch('', {
      method: '',
      headers: {},
      body: JSON.stringify({ messageId: props.useKey }),
    }).then(() => {
      setMessageUpdate([2, props.useKey])
    })
  }

  const getDate = () => {
    if (props.date) {
      const date = new Date(props.date)
      return date.toLocaleString()
    }
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      ></link>

      <section className="messageContainer">
        <div className="messageUser">ANONYMOUS</div>
        <section className="profilePic">
          <span class="material-icons md-36">account_circle</span>
        </section>
        <div className="messageText">
          {getDate()}
          <br></br>
          {props.message}
        </div>
        <section className="messageIconsContainer">
          <span class="material-icons" ref={likeIcon} onClick={likeComment}>
            favorite
          </span>
          <div ref={numLikes}>{props.likes}</div>
        </section>
      </section>
    </>
  )
}

export default Message
