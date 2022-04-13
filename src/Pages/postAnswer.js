import '../App.css'
import TopCommentsBox from '../components/Comments/TopCommentsBox'
import MessageScroll from '../components/Comments/MessageScroll'
// Main Context
import { ContextProvider } from '../components/Comments/Context'
import {useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'
import '../components/Comments/CommentsBox.css'

function PostAnswer()  {
  const [userData, setUserData] = useState(null)

  /* 2. Get the param */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)
    }
  }, [])
  
  const { state } = useLocation();
  console.log('POST IN ANSWER', state)

  const getDate = () => {
    if(state){
      const date = new Date(state.date)
      return date.toLocaleString()
    }
  }

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
                          src={state.image}
                          alt=""
                          className="img-fluid mb20"
                        />
                      </a>
                      <div className="ColHolder">
                        <TopCommentsBox autoFocus={false} userData={userData} post={state} />
                        <MessageScroll userData={userData} post={state}/>
                      </div>
                  </div>
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