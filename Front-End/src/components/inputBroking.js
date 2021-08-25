import React from 'react'
import Select from 'react-select'

const brokingOption = [
    {value: 'Malacca Securities Sdn Bhd', label: 'Malacca Securities Sdn Bhd'},
    {value: 'Public Bank', label: 'Public Bank'},
    {value: 'Kenaga Investors Berhad', label: 'Kenaga Investors Berhad'},
    {value: 'Rakuten', label: 'Rakuten'},
    {value: 'CIMB Bank', label: 'CIMB Bank'},
    {value: 'Maybank', label: 'Maybank'},
    {value: 'RHB Bank', label: 'RHB Bank'},
    {value: 'Hong Leong Bank', label: 'Hong Leong Bank'},
    {value: 'UOB Kay Hian', label: 'UOB Kay Hian'},
    {value: 'Alliance Bank', label: 'Alliance Bank'},
    {value: 'Others', label: 'Others'}
];

const InputBroking = (props) => {

    return (
        <div className="inputContainer">
            <div className="label" >Broking House :</div>
            <Select 
            className="inputAddress"
            options={brokingOption}
            placeholder="Select a Broking House"
            isSearchable
            noOptionsMessage={() => "No other options :("}
            onChange={props.onChange}
            defaultInputValue={props.defaultValue}
            maxMenuHeight="100"
            />
        </div>
    )
}

export default InputBroking