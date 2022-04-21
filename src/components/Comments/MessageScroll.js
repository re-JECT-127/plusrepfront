import React, {useEffect, useState, useRef} from 'react';
import Message from './Message';
//Main Context
import {useMainContext} from './Context';
import postService from '../../services/posts'
import './CommentsBox.css'

function MessageScroll(props) {
    const [userData, setUserData] = useState(null)


    //When bool from Main Context changes, re-render message list
    const {messageReset, commentIncrement, setCommentIncrement, messageUpdate} = useMainContext();

    //Make sure increment value in callback function for Intersection Observer is up to date
    const commentIncrementRef = useRef(commentIncrement);

    const [messages, setMessages] = useState([]);
    const [showBottomBar, setShowBottomBar] = useState(true);

    //Load up the first 10 comments. Do this either on app start or when a new comment is posted
    useEffect(() => {
        setShowBottomBar(true);
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUserData(user)
          postService.setToken(user.token)
        }

        postService.getSinglePost(props.post._id).then((post) => {
            console.log('post', post)
            setMessages(post.comments)
          })
    
        setMessages(props.post.comments)
        console.log('messages', messages)
    }, [messageReset])

    //Either update or delete an individual comment
    useEffect(() => {
        if(messageUpdate) {
            //If messageUpdate[0] is 1 then that means we update. Else we delete
            if(messageUpdate[0] === 1) {
                fetch("", {
                    method: "",
                    headers: {},
                    body: JSON.stringify({commentId: messageUpdate[1]})
                }).then(res => res.json()).then(commentData => {
                    updateComment(commentData);
                })
            }else if (messageUpdate[0] === 2) {
                deleteComment();
            }
        }
    }, [messageUpdate])

    function updateComment(commentData) {
        let currentMessage = [...messages];
        if(commentData) {
            let currentMessageIndex = currentMessage.findIndex(message => message._id === commentData._id);
            currentMessage.splice(currentMessageIndex, 1, commentData);
            setMessages(currentMessage);
        }
    }

    function deleteComment() {
        let currentMessage = [...messages];
        let currentMessageIndex = currentMessage.findIndex(message => message._id === messageUpdate[1]);
        currentMessage.splice(currentMessageIndex, 1);
        setMessages(currentMessage);
    }

    //Intersection Observer
    const observer = React.useRef(new IntersectionObserver(entries => {
        const first = entries[0];
        if(first.isIntersecting) {
            fetch("", {
                method: "",
                headers: {},
                body: JSON.stringify({commentIncrement: commentIncrementRef.current})
            }).then(res => res.json()).then(comments => {
                if(comments.length>0) {
                    setTimeout(() => {
                        setMessages(prevState => [...prevState, ...comments])
                    }, 3000)
                }else {
                    setTimeout(() => {
                        setShowBottomBar(false);
                    }, 3000)
                }
                //We use comments.length just in case there are not 10 comments left
                setCommentIncrement(prevState => prevState += comments.length);
            })
        }
    }), {threshold: 1})

    //Ensure comment increment is up to date
    useEffect(() => {
        commentIncrementRef.current = commentIncrement;
    }, [commentIncrement])

    //bottomBar will contain the bottomBar JSX element
    const [bottomBar, setBottomBar] = useState(null);

    useEffect(() => {
        const currentBottomBar = bottomBar;
        const currentObserver = observer.current;
        if(currentBottomBar) {
            currentObserver.observe(currentBottomBar);
        }
        return () => {
            if(currentBottomBar) {
                currentObserver.unobserve(currentBottomBar);
            }
        }
    }, [bottomBar])

    return (
        <>
        {/* <Message user="Dummy User" editable={false} message="jotain" likes={25}/> */}
        {messages.map(message => (
            <Message key={message.id} useKey={message.id}
            user={message.author} editable={message.editable}
            message={message.content} likes={message.likes}
            replies={message.replies} date={message.date} 
            post={message.post} userLikes={message.userLikes}/>
        ))}
        { messages.length > 9 && showBottomBar ? <div className="bottomBar" ref={setBottomBar}><div className="loader"></div></div> : null}

        {/* <div className="bottomBar"><div className="loader"></div></div> */}
        </>
    );
}

export default MessageScroll;