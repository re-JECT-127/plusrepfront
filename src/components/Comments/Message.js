import React, {useRef, useState, useContext} from 'react';
import CommentsBox from './CommentsBox';
import SubMessage from './SubMessage';
//Main Context
import {useMainContext} from './Context'

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

    return (
        <>
        <section className="messageContainer">
            <div className="messageUser">{props.user}</div>
            <i className="fas fa-user-circle"></i>
            <div className="messageText">{props.message}</div>
            <section className="messageIconsContainer">
                <i className="fas fa-thumbs-up" ref={likeIcon} onClick={likeComment}></i>
                <div ref={numLikes}>{props.likes}</div>
                <i className="fas fa-thumbs-down"></i>
                {
                    !props.editable ? (
                        <div onClick={changeOpenReply}
                        style={{cursor: "pointer"}}>REPLY</div>
                    ) : (
                        <div onClick={deleteMessage}
                        style={{cursor: "pointer"}}>DELETE</div>
                    )
                }
            </section>
            <showReply.Provider value={changeOpenReply}>
                {openReply && <CommentsBox useKey={props.useKey}
                autoFocus={true}/>}
            </showReply.Provider>
            { props.replies.length > 0 && (
            <section className="arrowReplies" onClick={changeArrow}>
                {arrow}
                {/* <div>View 4 replies</div> */}
                <div>View {props.replies.length} replies</div>
            </section>
            )
            }   
            { arrowUp && (
            <section className="subMessages">
                    {/* <SubMessage user="DummyReply" message="This is a dummy reply" likes={2}/> */}
                    {props.replies.map(reply => (
                        <SubMessage key={Math.random()} parentKey={props.useKey} subId={reply._id}
                        user={reply.user} message={reply.message} likes={reply.likes}/>
                    ))}
            </section>
            )
            }
        </section>
        </>
    );
}

export default Message;