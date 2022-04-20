import './App.css'
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import PostQuestion from './Pages/postQuestion'
import PostAnswer from './Pages/postAnswer'
import Feed from './Pages/Feed'
import Test from './components/Comments/TopCommentsBox'

function App() {
return (
      <HashRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/postQuestion" element={<PostQuestion />} />
        <Route path="/test" element={<Test />} />
        <Route path="/postanswer/:_id" element={<PostAnswer/>} />
        </Routes>
      </HashRouter>
);
}

export default App
