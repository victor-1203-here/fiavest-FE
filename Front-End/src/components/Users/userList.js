import React from 'react'
import '../../styles/component.css'
import UserCard from './userCard'

const UserList = (props) => {

    // console.log(props);
    const renderUsers = props.users.map((user) => {
        // console.log(user);
        return (
            <UserCard key={user.uuid} user={user} />
        )
    })

    return (
        <div>
            {renderUsers.length > 0 ? renderUsers : <div className="None">No User ...</div> }
        </div>
    )
}

export default UserList
