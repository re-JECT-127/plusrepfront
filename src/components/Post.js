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
    >
      <h1 className="object-header">{post.title}</h1>
      <div className="object-content">
        <p className="object-text">{post.content}</p>
        <img class="object-img" src={post.image} alt="up yours"></img>
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
