import { useState, useCallback } from 'react'
import userService from "../../services/users"

//Button to select/deselect a tag.
const TagButton = ({ tag, userData, onTagChange, text }) => {
    const [buttonColor, setButtonColor] = useState(tag[1])
  
    const handleTagChange = useCallback(
      (event) => {
        let newUserData = userData
  
        if (tag[0] === 'UI')
          newUserData.user.tags[0].UI =
            !newUserData.user.tags[0].UI
  
        if (tag[0] === 'Development')
          newUserData.user.tags[0].Development =
            !newUserData.user.tags[0].Development
  
        if (tag[0] === 'Sales')
          newUserData.user.tags[0].Sales = !newUserData.user.tags[0].Sales
  
          if (tag[0] === 'General')
          newUserData.user.tags[0].General = !newUserData.user.tags[0].General
  
        onTagChange(newUserData)
        window.localStorage.setItem('loggedUser', JSON.stringify(newUserData))
  
        console.log('newUserTags', newUserData.user.tags[0])
        userService.updateTags(newUserData.user.tags[0].id, newUserData.user.tags[0]).then((response) => {
          console.log('responseupdate tags', response)
          window.location.reload(false)
        })
      },
      [onTagChange, tag, userData]
    )
  
    return (
      <>
        <button
        className='tag-btn'
          style={{
            backgroundColor: buttonColor === true ? 'rgb(246, 202, 53)' : 'lightgrey',
            fontWeight: buttonColor === true ? 'bold' : 'normal',

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
  export default TagButton