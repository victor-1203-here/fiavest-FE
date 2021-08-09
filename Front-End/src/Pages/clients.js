import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/navbar'
import ClientList from '../components/Clients/clientList'
import '../styles/page.css'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/scrollToTop'
import testApi from '../api/test-api'
import PageButton from '../components/pageButton'

function Clients() {

    const [clients, setClients] = useState([])
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const inputElement = useRef("")

    const [currentPage, setCurrentPage] = useState(1);
    var pageSize = 50;

    const retriveClient = async () => {
        var sessionID = localStorage.getItem("SessionID");
        const responce = await testApi.get(`/private/users?role=client&pageSize=${pageSize}&page=${currentPage}`, {headers: {'sessionId': sessionID}}).catch(function(err) {
            // console.log(err.response.data);
            if(err.response.data.error.message === "Session expired") {
                alert("Session Expired, Please Login Again")
                localStorage.clear();
                window.location.pathname = "/login"
            } else {
                alert(err.response.data.error.message)
            }
        })
        return responce.data.data;
    };

    const prevPage = () => {
        let newValue = currentPage - 1
        setCurrentPage(newValue)
    }

    const nextPage = () => {
        let newValue = currentPage + 1
        setCurrentPage(newValue)
    }

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
    }, [currentPage])

    return (
        <div className="mainbody">
            <Navbar />
            <div className="addAndSearchCon">
                <Link to={"/addClient"} className="addBtn">ADD NEW CLIENT</Link>
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
            <ScrollToTop />
            <PageButton pageNum={currentPage} arrayLength={clients.length} onPrev={prevPage} onNext={nextPage} />
        </div>
    )

}

export default Clients
