import React from 'react'
import Select from 'react-select'

const termOption = [
    {value: 'Short Term', label: 'Short Term / 短期'},
    {value: 'Medium Term', label: 'Medium Term / 中期'},
    {value: 'Long Term', label: 'Long Term / 长期'},
];

const InputTerm = (props) => {

    return (
        <div className="inputContainer">
            <div className="label" >Investment Term :</div>
            <Select 
            className="inputAddress"
            options={termOption}
            placeholder="Select a Term"
            isSearchable
            noOptionsMessage={() => "No other term :("}
            onChange={props.onChange}
            defaultInputValue={props.defaultValue}
            maxMenuHeight="100"
            />
        </div>
    )
}

export default InputTerm