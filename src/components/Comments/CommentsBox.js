import React, {useRef, useState} from 'react'
import {useOpenReply} from './Message'
//Main Context
import {useMainContext} from './Context'
import './CommentsBox.css'

function CommentsBox(props) {

    const {setMessageUpdate} = useMainContext();

    const changeOpenReply = useOpenReply();

    const message = useRef(null);
    //Trigger the underline animation
    const [showCommentLine, setCommentLine] = useState(false);
    //True on focus, false on CANCEL press
    const [showButtons, setShowButtons] = useState(false);
    //True on input data, false when input is blank
    const [enableBtn, setEnablBtn] = useState(true);

    //When they click on the input, show the underline and the buttons
    const commentFocus = () => {
        setCommentLine(true);
        setShowButtons(true);
    }

    //When they click on the input, hide the underline
    const commentFocusOut = () => {
        setCommentLine(false);
    }

    //If input value isn't empty then enable the COMMENT btn
    const commentStroke = event => {
        let currMessage = event.target.value;
        if(currMessage) {
            setEnablBtn(false);
        } else {
            setEnablBtn(true);
        }
    }

    //send comment
    const sendComment = (event) => {
        event.preventDefault();
        fetch("", {
            method: "",
            headers: {},
            body: JSON.stringify({messageId: props.useKey, messageData: message.current.value})
        }).then(() => {
            setMessageUpdate([1,props.useKey]);
            //Reset everything so it resets
            message.current.value = '';
            setEnablBtn(false);
        })
    }


    return (
        <form>
            <section className="commentBox">
                <input
                autoFocus={props.autoFocus}
                type="text"
                placeholder="Type your comment here"
                ref={message}
                onFocus={commentFocus}
                onBlur={commentFocusOut}
                onKeyUp={commentStroke}
                />
                {/*Underline begins here*/}
                {showCommentLine && <div className="commentLine"></div>}
            </section>
            {showButtons && (
                <>
                <button className="commentButton sendButton" disabled={enableBtn} onClick={sendComment}>COMMENT</button>
                <button className="commentButton" style={{color: "gray", backgroundColor:"transparent"}}
                onClick={() => {
                    setShowButtons(false);
                    changeOpenReply()
                }}>CANCEL</button>
                </>
            )}
        </form>
    );
}

export default CommentsBox;