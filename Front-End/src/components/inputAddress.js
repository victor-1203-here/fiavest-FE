import React from 'react'
import Select from 'react-select'

const stateOption = [
    {value: 'Johor', label: 'Johor'},
    {value: 'Kedah', label: 'Kedah'},
    {value: 'Kelantan', label: 'Kelantan'},
    {value: 'Malacca', label: 'Malacca'},
    {value: 'Negeri Sembilan', label: 'Negeri Sembilan'},
    {value: 'Pahang', label: 'Pahang'},
    {value: 'Penang', label: 'Penang'},
    {value: 'Perak', label: 'Perak'},
    {value: 'Perlis', label: 'Perlis'},
    {value: 'Sabah', label: 'Sarawak'},
    {value: 'Selangor', label: 'Selangor'},
    {value: 'Terengganu', label: 'Terengganu'},
    {value: 'Kuala Lumpur', label: 'Kuala Lumpur'},
    {value: 'Labuan', label: 'Labuan'},
    {value: 'Putrajaya', label: 'Putrajaya'}
];

const InputAddress = (props) => {

    return (
        <div className="inputContainer">
            <div className="label" >Address :</div>
            <Select 
            className="inputAddress"
            options={stateOption}
            placeholder="Select a State"
            isSearchable
            noOptionsMessage={() => "No other state :("}
            onChange={props.onChange}
            defaultInputValue={props.defaultValue}
            maxMenuHeight="100"
            />
        </div>
    )
}

export default InputAddress
