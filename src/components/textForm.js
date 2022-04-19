import '../Modal.css'

const TextForm = ({ onSubmit, postChange, postValue, titleValue, titleChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <br></br>
        <h2>What's on your mind?</h2>
        <header class = 'header'>
        <input class = 'header'
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
        <button class='subtmitButton' id="submitButton">Submit</button>
      </div>
    </form>
  )
}

export default TextForm
