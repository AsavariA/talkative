import React from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const Chat = ({ activeChat, timeConverter }) => {
    const styles = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
    const email = JSON.parse(localStorage.getItem("user")).email;

    return (
        <div style={styles}>
            <p>{activeChat.username !== '' ? activeChat.username : 'No Active Chat'}</p>
            <div className="chat-area">
                {activeChat.chats.length > 0 ?
                    activeChat.chats.map((chat) => {
                        return (
                            <div key={chat.time} className={chat.sender === email ? 'rightbubble' : 'leftbubble'}>
                                <h3>{chat.msg}</h3>
                                <p>{timeConverter(chat.time)}</p>
                            </div>
                        )
                    }) : null
                }
            </div>
            <TextField
                variant="filled"
                fullWidth
                autoComplete="off"
                size="small"
                label="Type a message"
                type="text"
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                }}
            />
        </div>
    )
}

export default Chat
