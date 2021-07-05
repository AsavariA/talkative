import React, { useState } from 'react';
import AddUser from './AddUser'
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({nonFriends, allUsers, profileData}) => {
   
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <p style={{ marginBottom: '0.5rem'}}>PEOPLE YOU MIGHT KNOW</p>
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
            {!nonFriends
                ? <p>Loading...</p>
                // eslint-disable-next-line
                : nonFriends.filter((doc) => {
                    if (searchTerm === '') {
                        return doc.data
                    } else if (doc.data.username.toLowerCase().includes(searchTerm.toLowerCase())) { 
                        return doc.data
                    }
                }).map((doc, key) => {
                    return (
                        <div key={key}>
                            <AddUser doc={doc.data} nonFriends={nonFriends} allUsers={allUsers} profileData={profileData} />
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default Search