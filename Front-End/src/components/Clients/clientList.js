import React from 'react'
import '../../styles/component.css'
import ClientCard from './clientCard'

const ClientList = (props) => {

    // console.log(props)
    const renderClients = props.clients.map((client) => {
        // console.log(client);
        return (
            <ClientCard key={client.uuid} client={client} />
        )
    })

    return (
        <div>
            {renderClients.length > 0 ? renderClients : <div className="None">No Client ...</div> }
        </div>
    )
}

export default ClientList
