import React, { useState } from 'react'
import FriendTile from './FriendTile'
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const ChatList = ({ friendUsers }) => {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <p>HOMIES</p>
            <div style={{ margin: '1rem 0' }}>
                <TextField
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    size="small"
                    label="Search..."
                    type="text"
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                    }}
                />
            </div>
            {
                // eslint-disable-next-line
                friendUsers.filter((friend) => {
                    if (searchTerm === '') {
                        return friend
                    } else if (friend.data.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return friend
                    }
                }).map((friend, key) => {
                    return (
                        <div key={key}>
                            <FriendTile friend={friend} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ChatList
