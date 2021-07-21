import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/navbar'
import ClientList from '../components/Clients/clientList'
import '../styles/page.css'
import api from '../api/api'
import { Link } from 'react-router-dom'

function Clients() {

    const [clients, setClients] = useState([])
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const inputElement = useRef("")

    const retriveClient = async () => {
        const responce = await api.get("/clients");
        console.log(responce.data)
        return responce.data;
    };

    const SearchHandler = () => {
        // console.log(inputElement.current.value);
        const input = inputElement.current.value
        setSearch(input);
        if (input !== "") {
            const newClientList = clients.filter((client) => {
                return Object.values(client).join(" ").toLowerCase().includes(input.toLowerCase());
            });
            setSearchResult(newClientList);
        } else {
            setSearchResult(clients)
        }
    }

    useEffect(() => {
        const getAllClient = async () => {
            const allClient = await retriveClient();
            if(allClient) setClients(allClient)
        };
        getAllClient();
    }, [])

    return (
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addClient"} className="addBtn">ADD NEW CLIENT ?</Link>
                <div className="searchCon">
                    <input 
                    ref={inputElement}
                    className="searchBox" 
                    type="text" 
                    name="" 
                    value={search} 
                    onChange={SearchHandler}
                    placeholder="Search Here..." />
                </div>
            </div>
            
            <div className="TitleCon">
                <div className="mainTitle">
                    <div className="TitleText">Name</div>
                    <div className="TitleText">Broking House</div>
                    <div className="TitleText">Phone Num</div>
                    <div className="TitleText">Address(State)</div>
                    <div className="TitleText">Investment Term</div>
                    <div className="TitleText">Trading Exp</div>
                </div>
                <div className="actionTitle">
                    <div className="TitleText">Actions</div>
                </div>
            </div>
            <ClientList clients={search.length < 1 ?  clients : searchResult} />
        </div>
    )

}

export default Clients
