import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import fire from '../../services/fire';
import firebase from 'firebase/app';

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
        if (msg.trim().length !== 0) {
            console.log(`submitted: ${msg}`)
            fire.firestore().collection('Users')
                .doc(email)
                .collection('Chats')
                .doc(activeChat.email)
                .update({
                    "chats": firebase.firestore.FieldValue.arrayUnion(
                        {
                            "msg": msg,
                            "sender": email,
                            "time": new Date(),
                        }
                    )
                })

            fire.firestore().collection('Users')
                .doc(activeChat.email)
                .collection('Chats')
                .doc(email)
                .update({
                    "chats": firebase.firestore.FieldValue.arrayUnion(
                        {
                            "msg": msg,
                            "sender": email,
                            "time": new Date(),
                        }
                    )
                })
            setMsg('');
        } else {
            console.log(`empty message`)
            setMsg('');
        }
    }

    return (
        <div style={styles}>
            <p>{activeChat.username !== '' ? activeChat.username : 'No Active Chat'}</p>
            <div className="chat-area">
                {activeChat.chats.length > 0 ?
                    activeChat.chats.map((chat) => {
                        return (
                            <div key={chat.time} style={{ display: 'flex', padding: '0.5rem 0', flexDirection: 'column', alignItems: chat.sender === email ? 'flex-end' : 'flex-start' }}>
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
                    value={msg}
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
