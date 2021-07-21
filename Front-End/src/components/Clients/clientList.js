import React from 'react'
import '../../styles/component.css'
import ClientCard from './clientCard'

const ClientList = (props) => {

    console.log(props)
    const renderClients = props.clients.map((client) => {
        return (
            <ClientCard client={client} />
        )
    })

    return (
        <div>
            {renderClients.length > 0 ? renderClients : <div className="None">Loading List...</div> }
        </div>
    )
}

export default ClientList
