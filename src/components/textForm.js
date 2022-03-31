import { useState } from "react";
import '../App.css'

const TextForm = () => {
  const [body, setBody] = useState('');

  return (
      
    <div>
      <h2>What's on your mind?</h2>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="10"
        ></textarea>
        <button class="btn btn-primary">Post</button>
    </div>
  );
}
 
export default TextForm;