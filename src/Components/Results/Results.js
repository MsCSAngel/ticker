import React from 'react';
import Result from './Result/Result'

const results = (props) => {

    let SYMBOL = "1. symbol";
    let NAME = "2. name";
    let CURRENCY = "8. currency";

    let results = props.list.map( (result, index) => {
        return (
            <Result 
                key={index}    
                symbol={result[SYMBOL]} 
                name={result[NAME]}
                click={(event)=>{ props.selected(event, result[SYMBOL], result[NAME], result[CURRENCY]) }}
                />
        );
    });

    return results;
}

export default results;