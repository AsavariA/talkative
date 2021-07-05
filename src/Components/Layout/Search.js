import React, { useState } from 'react';
import fire from '../../services/fire';
import AddUser from './AddUser'
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    const [userList, setUserList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    fire.firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
            setUserList(documents)
        })

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
            {!userList
                ? <p>Loading...</p>
                // eslint-disable-next-line
                : userList.filter((doc) => {
                    if (searchTerm === '') {
                        return doc
                    } else if (doc.username.toLowerCase().includes(searchTerm.toLowerCase())) { 
                        return doc
                    }
                }).map((doc, key) => {
                    return (
                        <div key={key}>
                            <AddUser doc={doc} />
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default Search