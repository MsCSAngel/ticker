import React from 'react';
import '../Results.css'

const result = (props)=>{
        
    return (
        <div 
            className="results"
            onClick={props.click}>
            <span className="symbol">{props.symbol}</span><span className="resultsName">{props.name}</span>
        </div>
    )
}

export default result;