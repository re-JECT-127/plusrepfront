import '../App.css'
import TopCommentsBox from '../components/Comments/TopCommentsBox'
import MessageScroll from '../components/Comments/MessageScroll'
// Main Context
import { ContextProvider } from '../components/Comments/Context'
import {useLocation} from 'react-router-dom';

function PostAnswer()  {
  /* 2. Get the param */
  
  const { state } = useLocation();
  console.log('POST IN ANSWER', state)

  return (
    <>
      <ContextProvider>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="profile.css" />
        <div className="container">
          <div className="row bootstrap snippets bootdeys">
            <div className="col-md-8 col-sm-12">
              <div className="comment-wrapper">
                <div className="panel panel-info">
                  <div className="panel-body">
                    <div className="vtimeline-content">
                      <a href="#">
                        <img
                          src="https://miro.medium.com/max/1400/1*kSOvoHiZvF_jNJL4zF06ug.png"
                          alt=""
                          className="img-fluid mb20"
                        />
                      </a>
                      <div className="ColHolder">
                        <TopCommentsBox autoFocus={false} />
                        <MessageScroll />
                      </div>
                      <h3>Help needed in Java</h3>
                      <ul className="post-meta list-inline">
                        <li className="list-inline-item">
                          <i className="fa fa-user-circle-o" />{' '}
                          <a href="#">John Doe</a>
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-calendar-o" />{' '}
                          <a href="#">15.3.2022</a>
                        </li>
                        <li className="list-inline-item">
                          <i className="fa fa-tags" /> <a href="#">#Java</a>
                          &nbsp;
                          <a href="#">#ProjektiPlusrep</a>
                        </li>
                      </ul>
                      <p>
                       {state !== null ? state.content : 'error'}
                      </p>
                      <br />
                    </div>
                    <ul className="media-list">
                      <li className="media">
                        <a href="#" className="pull-left">
                          <img
                            src="https://bootdey.com/img/Content/user_1.jpg"
                            alt=""
                            className="img-circle"
                          />
                        </a>
                        <div className="media-body">
                          <span className="text-muted pull-right">
                            <small className="text-muted">30 min ago</small>
                          </span>
                          <strong className="text-success">
                            MattiMeikalainen
                          </strong>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Curabitur in iaculis ex. Etiam volutpat
                            laoreet .
                          </p>
                        </div>
                      </li>
                      <li className="media">
                        <a href="#" className="pull-left">
                          <img
                            src="https://bootdey.com/img/Content/user_2.jpg"
                            alt=""
                            className="img-circle"
                          />
                        </a>
                        <div className="media-body">
                          <span className="text-muted pull-right">
                            <small className="text-muted">50 min ago</small>
                          </span>
                          <strong className="text-success">MaijaM</strong>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Curabitur in iaculis ex. Etiam volutpat
                            laoreet
                          </p>
                        </div>
                      </li>
                      <li className="media">
                        <a href="#" className="pull-left">
                          <img
                            src="https://bootdey.com/img/Content/user_3.jpg"
                            alt=""
                            className="img-circle"
                          />
                        </a>
                        <div className="media-body">
                          <span className="text-muted pull-right">
                            <small className="text-muted">59 min ago</small>
                          </span>
                          <strong className="text-success">JokuKolmas</strong>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Curabitur in iaculis ex. Etiam volutpat
                            laoreet
                          </p>
                        </div>
                      </li>
                    </ul>
                    <hr />
                    <div className="panel-heading">Comment panel</div>
                    <div className="clearfix" />
                    <textarea
                      className="form-control"
                      placeholder="write a comment..."
                      rows={3}
                      defaultValue={''}
                    />
                    <br />
                    <button type="button" className="btn btn-info pull-right">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContextProvider>
    </>
  )
}

export default PostAnswer