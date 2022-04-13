import React, {useRef, useState} from 'react'
//Main Context
import {useMainContext} from './Context';
import './CommentsBox.css'
import commentsService from '../../services/comments'


function TopCommentsBox(props) {

    const {setMessageReset, setCommentIncrement} =  useMainContext();

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

    const commentObject = {
        author: props.userData.user._id,
        content: message.current.value,
        post: props.post._id,
      }
      console.log('commentObj msg',message)

      console.log('commentObj',commentObject)

      commentsService
      .create(commentObject)
      .then((returnedObject) => {
         //Reset entire comments and matching increment counter
         setMessageReset(prevState => !prevState);
         setCommentIncrement(10);
         //Delete text input, update comments and disable COMMENT BUTTON
         message.current.value = ''
         setEnablBtn(true) 
      })
 
  

    /*
        fetch("", {
        method: "",
        headers: {},
        body: JSON.stringify({})
    }).then(() => {
        //Reset entire comments and matching increment counter
        setMessageReset(prevState => !prevState);
        setCommentIncrement(10);
        //Delete text input, update comments and disable COMMENT BUTTON
        message.current.value = '';
        setEnablBtn(true);
    })
*/

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
                    message.current.value = ""
                }}>CANCEL</button>
                </>
            )}
        </form>
    );
}

export default TopCommentsBox;