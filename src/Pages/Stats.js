import statsService from '../services/stats'
import { useState, useEffect } from 'react'
import '../App.css'

function Stats() {
  const [postStats, setPostStats] = useState(null)
  const [userStats, setUserStats] = useState(null)
  const [commentStats, setCommentStats] = useState(null)

  useEffect(() => {
    statsService.getUsers().then((response) => {
      console.log(response)
      setUserStats(response)
    })

    statsService.getPosts().then((response) => {
      console.log(response)
      setPostStats(response)
    })

    statsService.getComments().then((response) => {
      console.log(response)
      setCommentStats(response)
    })
  })

  return (
    <div
      style={{
        margin: 10,
      }}
    >
      <h1
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Activity Statistics
      </h1>
      <h2
        style={{
          fontSize: 20,
        }}
      >
        Users
      </h2>
      <p
        style={{
          marginBottom: 10,
        }}
      >
        {userStats
          ? `Total number of accounts registered: ${userStats}`
          : 'Loading...'}
      </p>

      <h2
        style={{
          fontSize: 20,
        }}
      >
        Posts
      </h2>
      <p
        style={{
          marginBottom: 10,
        }}
      >
        {postStats
          ? `Total number of questions/posts:  ${postStats}`
          : 'Loading...'}
      </p>
      <h2
        style={{
          fontSize: 20,
        }}
      >
        Comments
      </h2>
      <p>
        {commentStats
          ? `Total number of comments/answers on posts:  ${commentStats}`
          : 'Loading...'}
      </p>
    </div>
  )
}

export default Stats
