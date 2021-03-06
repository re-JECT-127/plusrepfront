import '../Modal.css'

const TextForm = ({ onSubmit, postChange, postValue, titleValue, titleChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <br></br>
        <h2>What's on your mind?</h2>
        <header>
        <input type='text'
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
        <button id="submitButton">Submit</button>
      </div>
    </form>
  )
}

export default TextForm
