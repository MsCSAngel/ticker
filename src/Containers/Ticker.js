import React, {Component} from 'react';
import Search from '../Components/Search/Search';
import Results from '../Components/Results/Results';
import MarketSummary from './MarketSummary/MarketSummary';
import Menu from '../Components/Menu/Menu';
import axios from 'axios';

class Ticker extends Component {

    state = {
        results: [],
        selectedSymbol: null,
        selectedName: null,
        error: false
    }
 
    searchHandler = (event) =>{

        if ( event.target.value.length > 1 ) {
            let url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + event.target.value +"&apikey=B5G0EY7TG8GPVXDU";            
            axios.get(url)
                .then( response=>{                                              
                    this.setState({
                        results: response.data.bestMatches
                    });  
                })
                .catch( error =>{
                    this.setState({
                        error: true
                    });
                });            
        }             
    }

    selectResultHandler = (event, symbol, name, currency) => {

        this.setState({
            results: [],
            selectedSymbol: symbol,
            selectedName: name,
            selectedCurrency: currency
        });  
        console.log("selected: ", symbol);            
    }
   
    render(){

        // TODO: create Results component that returns a list of Result components
        let results=null;
        if ( this.state.results && this.state.results.length > 0 ){
            results = <Results 
                        list={this.state.results}
                        selected = {this.selectResultHandler}/>
        }
        
        let marketSummary= null;
        
        if (this.state.selectedSymbol !== null){
            console.log("this.state.selectedSymbol", this.state.selectedSymbol);
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
                    change={ this.searchHandler }></Search>
                {results}
                {marketSummary}
            </div>
   
        )
       
    }
}

export default Ticker;