import React, { useState } from 'react';
import fire from '../../services/fire';
import {Avatar} from '@material-ui/core';

const FriendTile = ({friend}) => {

    const [photo, setPhoto] = useState('')
    const lastMessage = friend.data.chats[friend.data.chats.length - 1]

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = date + ' ' + month + ' ' + hour + ':' + min;
        return time;
      }

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
        <div className="list-tile">
            <Avatar alt="profile-photo" src={photo} />
            <div>
                <h2>{friend.data.username}</h2>
                <h3>{lastMessage.msg.length > 30 ? `${lastMessage.msg.slice(0,30)}. . .` : lastMessage.msg}</h3>
            </div>
                <h3>{timeConverter(lastMessage.time)}</h3>
        </div>
    )
}

export default FriendTile
