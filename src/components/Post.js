import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('CLICKED POST', post)
    navigate('/postanswer', { state: post })
  }

  function changeBackground(e) {
    e.currentTarget.style.border = '5px solid rgb(246, 202, 53)'
    e.currentTarget.style.cursor = 'pointer'
  }

  function changeBackgroundBack(e) {
    e.currentTarget.style.border = '0px solid rgb(246, 202, 53)'
  }

  const getDate = () => {
    if(post.date){
      const date = new Date(post.date)
      return date.toLocaleString()
    }
  }


  return (
    <div
      class="object-box"
      onClick={handleClick}
      onMouseEnter={changeBackground}
      onMouseLeave={changeBackgroundBack}
    >
      <h1>TOPIC HERE</h1>
      <p>{post.content}</p>
      <p style={{fontSize: 14}}>{getDate()}</p>

    </div>
  )
}

export default Post