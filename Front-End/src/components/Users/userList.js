import React from 'react'
import '../../styles/component.css'
import UserCard from './userCard'

const UserList = (props) => {

    // console.log(props);
    const renderUsers = props.users.map((user) => {
        return (
            <UserCard user={user} />
        )
    })

    return (
        <div>
            {renderUsers.length > 0 ? renderUsers : <div className="None">Loading List ...</div> }
        </div>
    )
}

export default UserList
