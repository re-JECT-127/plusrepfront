import '../App.css'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import TagButton from '../components/Profile/TagButton'

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [logged, setLogged] = useState(true)

  //Fetch userData from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUserData(user)
      console.log(user.user)
    } else {
      setLogged(false)
    }
  }, [])

  const createTagButtons = (tags) => {
    const tagButtonArray = Object.entries(tags).filter((key) => {
      if (
        key[0] === 'UI' ||
        key[0] === 'Development' ||
        key[0] === 'Sales' ||
        key[0] === 'General'
      ) {
        const newObj = { [key[0]]: key[1] }
        console.log(newObj)
        return newObj
      }
    })

    console.log('array', tagButtonArray)
    return tagButtonArray
  }

  //If not logged, navigate back to /
  if (!logged) {
    // window.alert('Sign in, please.')
    return <Navigate to="/" />
  } else {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="profile.css" />
        <div className="flex-container">
          <div className="big-box-profile">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="object-txt">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript:void(0)">User</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
            {/* /Breadcrumb */}
            <div className="object-box">
              <div className="object-box">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={userData !== null && userData.user.picture}
                        alt="Admin"
                        className="rounded-circle"
                        width={150}
                      />
                      <div className="mt-3">
                        <h4>{userData ? userData.user.name : ''}</h4>
                        <p className="text-secondary mb-1">
                          Full Stack Developer
                        </p>
                        <p className="text-muted font-size-sm">
                          Houston Helsinki
                        </p>
                        <div className="progress mb-3" style={{ height: 10 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="text-muted font-size-sm">
                          7 500 / 10 000
                        </p>
                        <h5>Level 5</h5>
                        {/*<button class="btn btn-primary">Follow</button>
                <button class="btn btn-outline-primary">Message</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="object-box">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Tags</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {userData !== null &&
                          createTagButtons(userData.user.tags[0]).map((tag) => (
                            <TagButton
                              key={tag[0]}
                              text={tag[0]}
                              tag={tag}
                              userData={userData}
                              onTagChange={setUserData}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters-sm">
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">
                          Achievements
                        </h6>
                        <small>Comments</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Users helped</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '72%' }}
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Friends</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '89%' }}
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp1</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '55%' }}
                            aria-valuenow={55}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp2</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '66%' }}
                            aria-valuenow={66}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="d-flex align-items-center mb-3">
                          Achievements 2
                        </h6>
                        <small>Temp3</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp4</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '72%' }}
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp5</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '89%' }}
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp6</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '55%' }}
                            aria-valuenow={55}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small>Temp7</small>
                        <div className="progress mb-3" style={{ height: 5 }}>
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: '66%' }}
                            aria-valuenow={66}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Profile