import '../App.css'

const TextForm = ({ onSubmit, postChange, postValue }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>What's on your mind?</h2>
        <textarea
          required
          value={postValue}
          onChange={postChange}
        ></textarea>
        <button type="submit">Post</button>
      </div>
    </form>
  )
}

export default TextForm
