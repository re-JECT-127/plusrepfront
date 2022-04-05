import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import PostQuestion from './Pages/postQuestion'
import PostAnswer from './Pages/postAnswer'
import Feed from './Pages/Feed'
import Test from './components/Comments/TopCommentsBox'

function App() {
return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postQuestion" element={<PostQuestion />} />
        <Route path="/postAnswer" element={<PostAnswer />} />
        <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
);
}

export default App
