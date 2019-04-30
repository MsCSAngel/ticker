import React from 'react';
import './Search.css'

const search = (props) => {

    return (
        <div className="searchDiv">
            <input 
                className='search'
                type="search"
                results="10"
                placeholder="Enter name or symbol"
                onChange={props.change}/>
        </div>
    )
}

export default search;