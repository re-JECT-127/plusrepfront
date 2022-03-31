import '../App.css'
import React from 'react';
import FileInput from '../components/fileInput';
import TextForm from '../components/textForm';

const PostQuestion = () => {

    return (
<>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossOrigin="anonymous"
  />
  <link rel="stylesheet" href="profile.css" />
  <div class="body">
  <div className="container bootstrap snippets bootdey">
    <div className="row">
      <div className="col-md-offset-3 col-md-6 col-xs-12">
        <div className="well well-sm well-social-post">
            <ul className="list-inline" id="list_PostActions">

                <FileInput></FileInput>

              <li>
                <a href="#">Add code</a>
              </li>
            </ul>
            <div className="postquestion-textform">
            <TextForm></TextForm>
            </div>

            <ul className="list-inline post-actions">
              <li>
                <a href="#">
                  <span className="glyphicon glyphicon-camera" />
                </a>
              </li>
              <li>
                <a href="#" className="glyphicon glyphicon-user" />
              </li>
              <li>
                <a href="#" className="glyphicon glyphicon-map-marker" />
              </li>
            </ul>
            </div>
        </div>
      </div>
    </div>
    </div>
</>
    )
}

export default PostQuestion