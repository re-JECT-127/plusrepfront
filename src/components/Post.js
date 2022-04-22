import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/postanswer/${post._id}`, { state: post })
  }

  function changeBackground(e) {
    e.currentTarget.style.border = '5px solid rgb(246, 202, 53)'
    e.currentTarget.style.cursor = 'pointer'
  }

  function changeBackgroundBack(e) {
    if (post.solved){
      e.currentTarget.style.border = '5px solid rgb(0, 255, 136)'
    } else {
      e.currentTarget.style.border = '5px solid white'
    }
  }

  const getDate = () => {
    if (post.date) {
      const date = new Date(post.date)
      return date.toLocaleString()
    }
  }

  return (
    <div
      className="object-box"
      onClick={handleClick}
      onMouseEnter={changeBackground}
      onMouseLeave={changeBackgroundBack}
      style={post.solved ? { border: '5px solid rgb(0, 255, 136)' } : {}}
    >
      <h1 className="object-header">{post.title}</h1>
      <div className="object-content">
        <p className="object-text">{post.content}</p>
        <img class="object-img" src={post.image} alt={''}></img>
      </div>
      <p>
        {post.tags.UI === true && '#UI '}
        {post.tags.Development === true && '#Development '}
        {post.tags.Sales === true && '#Sales '}
        {post.tags.General === true && '#General '}
      </p>
      <div class="button-box">
        <p className="object-text">{getDate()} </p>
      </div>
    </div>
  )
}

export default Post
