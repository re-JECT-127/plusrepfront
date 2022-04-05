import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log('CLICKED POST', post)
    navigate('/postanswer', { state: post })
  }

  function changeBackground(e) {
    e.target.style.background = 'rgb(246, 202, 53)'
  }

  function changeBackgroundBack(e) {
    e.target.style.background = 'white'
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
    </div>
  )
}

export default Post