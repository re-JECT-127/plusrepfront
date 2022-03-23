import logo from "./logo.svg"
import { useState, useEffect } from "react"
import "./App.css"
import postService from "./services/posts"

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getAll().then((posts) => {
      setPosts(posts)
    })
  }, [])

  return (
    <body class="flex-container">
      <div class="big-box">
        {posts.map((post) => (
          <Post content={post.content} key={posts.indexOf(post)} />
        ))}
      </div>

      <div class="register-box">
        <h1>Register</h1>
        <form
          action="http://localhost:3000/user"
          method="post"
          id="addUserForm"
        >
          <div class="textbox">
            <i class="user-box"></i>
            <input
              type="text"
              name="name"
              placeholder="Username"
              required
            ></input>
          </div>

          <div class="textbox">
            <i class="email-box"></i>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            ></input>
          </div>

          <div class="textbox">
            <i class="password-box"></i>
            <input
              type="password"
              name="password"
              placeholder="Password"
              pattern="(?=.*[A-Z]).{8,}"
              required
            ></input>
          </div>

          <input type="submit" class="btn" value="Create account"></input>
        </form>
      </div>
    </body>
  )
}

const Post = ({ content }) => {
  return (
    <div class="object-box">
      <h1>TOPIC HERE</h1>
      <p>{content}</p>
    </div>
  )
}

export default App
