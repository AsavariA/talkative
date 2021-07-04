import React, { useState } from 'react';
import fire from '../../services/fire';
import AddUser from './AddUser'

const Search = () => {
    const [userList, setUserList] = useState([]);

    fire.firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
            const documents = querySnapshot.docs.map(doc => doc.data())
            setUserList(documents)
        })

    return (
        <>
            <div>Search</div>
            {!userList
                ? <p>Loading...</p>
                : userList.map((doc) => <div key={doc.username}><AddUser doc={doc}/></div>)
            }
        </>
    )
}

export default Search