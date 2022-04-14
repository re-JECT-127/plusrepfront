import '../App.css'

const TextForm = ({ onSubmit, postChange, postValue, titleValue, titleChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>What's on your mind?</h2>
        <header>
        <input 
        required 
        placeholder="Title"
        value={titleValue}
        onChange={titleChange}
        />
        </header>
        <textarea
          required
          value={postValue}
          onChange={postChange}
          rows="10"
        ></textarea>
        <button class="btn btn-primary">Submit</button>
      </div>
    </form>
  )
}

export default TextForm
