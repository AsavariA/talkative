import React, { useState } from 'react'
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
    const [msg, setMsg] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('submitted');
    }

    return (
        <div style={styles}>
            <p>{activeChat.username !== '' ? activeChat.username : 'No Active Chat'}</p>
            <div className="chat-area">
                {activeChat.chats.length > 0 ?
                    activeChat.chats.map((chat) => {
                        return (
                            <div key={chat.time} style={{display: 'flex', padding: '0.5rem 0', flexDirection: 'column', alignItems: chat.sender === email ? 'flex-end' : 'flex-start'}}>
                                <div className={chat.sender === email ? 'rightbubble' : 'leftbubble'}>
                                    <h3>{chat.msg}</h3>
                                    <p>{timeConverter(chat.time)}</p>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="filled"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    label="Type a message"
                    type="text"
                    onChange={(e) => setMsg(e.target.value)}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton type="submit">
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                    }}
                />
            </form>
        </div>
    )
}

export default Chat
