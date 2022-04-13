import React, {useRef, useState, useContext} from 'react';
import CommentsBox from './CommentsBox';
import SubMessage from './SubMessage';
//Main Context
import {useMainContext} from './Context'
import './CommentsBox.css'

const showReply = React.createContext();

export function useOpenReply() {
    return useContext(showReply);
}

function Message(props) {

    const {setMessageUpdate} = useMainContext();

    const likeIcon = useRef();
    const numLikes = useRef();

    const [arrowUp, setArrowUp] = useState(false);
    const [openReply, setOpenReply] = useState(false);

    //Toggled when CANCEL button and REPLY button are pressed
    const changeOpenReply = () => {
        setOpenReply(prevState => prevState = !prevState);
    }

    //Toggle arrow up and down
    let arrow = <i className="fas fa-caret-down"></i>;
    
    const changeArrow = () => {
        setArrowUp(prevState => prevState = !prevState);
    }

    if(arrowUp) {
        arrow = <i className="fas fa-caret-up"></i>;
    } else {
        arrow = <i className="fas fa-caret-down"></i>
    }

    //Like message
    let toggleLike = false;
    let likes = props.likes;

    const likeComment = () => {
        toggleLike = !toggleLike;
        if(toggleLike) {
            likes++;
            likeIcon.current.style.color = "#4688de";
        } else {
            likes--;
            likeIcon.current.style.color = "gray";
        }
        numLikes.current.innerHTML = likes;
        //Store this new value in the database
        fetch("", {
            method: "",
            headers: {},
            body: JSON.stringify({messageId: props.useKey, likes: likes})
        })
    }

    const deleteMessage = () => {
        fetch("", {
            method: "",
            headers: {},
            body: JSON.stringify({messageId:props.useKey})
        }).then(() => {
            setMessageUpdate([2, props.useKey])
        })
    }

    const getDate = () => {
        if(props.date){
          const date = new Date(props.date)
          return date.toLocaleString()
        }
      }
    

    return (
        <>
        <section className="messageContainer">
            <div className="messageUser">{props.user}</div>
            <i className="fas fa-user-circle"></i>
            <div className="messageText">{getDate()}<br></br>{props.message}</div>
            <section className="messageIconsContainer">
                <i className="fas fa-thumbs-up" ref={likeIcon} onClick={likeComment}></i>
                <div ref={numLikes}>{props.likes}</div>
                <i className="fas fa-thumbs-down"></i>
            </section>
         
        </section>
        </>
    );
}

export default Message;