import React, {Component} from 'react';
import axios from 'axios';

import './MarketSummary.css';

class MarketSummary extends Component {
    
    constructor(props){
        
        super(props);

        this.state = {
            symbol: null,
            name: null,
            currency: null,
            marketSummary: {
                high: null,
                low: null,
                price: null,
                change: null,
                changePercent: null,
                lastTradingDay: null
            },
            error: false
        };
    }

    componentDidMount(){

        console.log("did update");

        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + this.props.symbol + "&interval=5min&apikey=B5G0EY7TG8GPVXDU";
        console.log(url);
        axios.get( url )
                .then( response => {
                    // ugh - get this out of here!  Too dependent on Alpha Vantage api format
                    let quote = null;
                    if ( response.data["Global Quote"]){
                        quote = response.data["Global Quote"];                            
                        let marketSummary = {
                            high: quote["03. high"],
                            low: quote["04. low"],
                            price: quote["05. price"],                                
                            change: quote["09. change"],
                            changePercent: quote["10. change percent"],
                            lastTradingDay: quote["07. latest trading day"],
                        }
                        this.setState({ 
                            symbol: this.props.symbol,
                            name: this.props.name, 
                            currency: this.props.currency ,                   
                            marketSummary: marketSummary
                        });
                    }                   
                })
                // note: if the url is wrong, alpha vantage sends back 200 ok with "Error Message:"
                .catch( error =>{
                    this.setState({
                        error: true
                    });                    
                });  
                 
    }

    render(){

        let summary = null;
        if ( this.props.symbol !== null ) {
            summary = <p>Loading....</p>;
        } 

        if ( this.state.error ) {
            summary = <p>Uh oh, something went wrong......</p>
        }
        
        if ( this.state.symbol != null) {
            console.log("this.state.symbol", this.state.symbol);
                
            //console.log("current", current); 
            let change = "positive";
            if (this.state.change < 0){
                change="negative";
            }   
            
            summary = (
                <div className="marketSummary">
                    <p className="subTitle"><span > Market Summary ></span> <span>{this.state.name}</span></p>
                    <p>{this.state.symbol}</p>
                    <p><span className="price">{this.state.marketSummary.price}  {this.state.currency}</span> <span className={change}> {this.state.marketSummary.change} ( {this.state.marketSummary.changePercent} )</span></p>
                    <p>{this.state.marketSummary.lastTradingDay}</p>
                </div>
            )
        }        
        console.log("return summary: ", summary)        
        return summary;
    }

}

export default MarketSummary;