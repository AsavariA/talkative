import React, { useState } from 'react';
import fire from '../../services/fire';
import {Avatar} from '@material-ui/core';

const FriendTile = ({friend, setActiveChat, timeConverter}) => {

    const [photo, setPhoto] = useState('')
    const lastMessage = friend.data.chats[friend.data.chats.length - 1]

    

    fire.firestore()
        .collection('Users')
        .doc(friend.id)
        .get().then((doc)=> {
            if(doc.exists){
                setPhoto(doc.data().photo)
            } else {
                setPhoto('')
            }
        }).catch((err)=>{
            console.log(err)
        })

    return (
        <div className="list-tile" onClick={() => setActiveChat({email: friend.id, username: friend.data.username, chats: friend.data.chats})}>
            <Avatar alt="profile-photo" src={photo} />
            <div style={{width: '60%'}}>
                <h2>{friend.data.username}</h2>
                <h3>{lastMessage.msg.length > 20 ? `${lastMessage.msg.slice(0,20)}. . .` : lastMessage.msg}</h3>
            </div>
            <div style={{width: '10%'}}>
                <h3>{timeConverter(lastMessage.time)}</h3>
            </div>    
        </div>
    )
}

export default FriendTile
