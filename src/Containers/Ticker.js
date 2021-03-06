import React, {Component} from 'react';
import Search from '../Components/Search/Search';
import Results from '../Components/Results/Results';
import MarketSummary from './MarketSummary/MarketSummary';
import Menu from '../Components/Menu/Menu';
import axios from 'axios';
import {debounce} from 'lodash';

class Ticker extends Component {

    state = {
        results: null,
        selectedSymbol: null,
        selectedName: null,
        error: false
    }
 
    searchHandler = debounce( (keyword) =>{

            let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + keyword +"&apikey=B5G0EY7TG8GPVXDU"; 
            
            axios.get( url )
                .then( response=>{   

                    let error = false;
                    // if we've called the api too many times, we'll get back a 'note' - treat
                    // it like an error
                    if ( response.data["Note"] ){
                        error = true;
                    }
                    this.setState({
                        selectedSymbol: null,
                        selectedName: null,
                        results: response.data.bestMatches,
                        error: error
                    });  
                })
                .catch( error =>{
                    this.setState({
                        error: true
                    });
                });            
                  
    }, 500);

    selectResultHandler = (event, symbol, name, currency) => {

        this.setState({
            results: null,
            selectedSymbol: symbol,
            selectedName: name,
            selectedCurrency: currency
        });  
          
    }
   
    render() {

        let results = null;
        if ( this.state.results && this.state.results.length === 0 ){
            results = <p>No results found.  Try again.</p>
        }
        if ( this.state.results && this.state.results.length > 0 ){
            results = <Results 
                        list={this.state.results}
                        selected = {this.selectResultHandler}/>
        }
        
        let marketSummary= null;
        
        if ( this.state.selectedSymbol !== null ){

            marketSummary = 
                <MarketSummary 
                    symbol={this.state.selectedSymbol}
                    name={this.state.selectedName}
                    currency={this.state.selectedCurrency}/>        
        }
        
        return (
       
            <div>
                <Menu/>
                <Search
                    change={ event=>{this.searchHandler(event.target.value) }}></Search>
                {results}
                {marketSummary}
            </div>
   
        )
       
    }
}

export default Ticker;