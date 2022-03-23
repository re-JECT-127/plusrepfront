<>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossOrigin="anonymous"
  />
  <link rel="stylesheet" href="app.css" />
  <div className="container bootstrap snippets bootdey">
    <div className="row">
      <div className="col-md-offset-3 col-md-6 col-xs-12">
        <div className="well well-sm well-social-post">
          <form>
            <ul className="list-inline" id="list_PostActions">
              <li className="active">
                <a href="#">Add photos/Video</a>
              </li>
              <li>
                <a href="#">Add code</a>
              </li>
            </ul>
            <textarea
              className="form-control"
              placeholder="What's n your mind?"
              defaultValue={""}
            />
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
              <li className="pull-right">
                <a href="#" className="btn btn-primary btn-xs">
                  Post
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  </div>
</>
