import React from 'react'

const ChatList = ({ friendUsers }) => {
    return (
        <div>
            Homies
            {
                friendUsers.map(friend => {
                    return (
                        <p>Hi</p>
                    )
                })
            }
        </div>
    )
}

export default ChatList
