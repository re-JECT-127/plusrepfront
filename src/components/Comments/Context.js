import React, {useContext, useState} from 'react';

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

export function ContextProvider(props) {
    //The state that allows us to trigger either an UPDATE or DELETE request of an individual comment
    const [messageUpdate, setMessageUpdate] = useState();
    //This state Boolean will be changed when we post a new comment to refresh the first 10 messages
    const [messageReset, setMessageReset] = useState(false);
    //This is the state that holds the current increment value. This is used by the Intersection observer when we fetch new comments
    const [commentIncrement, setCommentIncrement] = useState(10);


    const value = {
        messageReset,
        setMessageReset,
        messageUpdate,
        setMessageUpdate,
        commentIncrement,
        setCommentIncrement
    }

    return (
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}