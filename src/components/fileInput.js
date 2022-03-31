import React from 'react';
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
    }
    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.current.files[0].name}`
      );
    }
  
    render() {
      return (
        <div class="main-body">
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input type="file" ref={this.fileInput} />
          </label>
          <br />
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );

  export default FileInput