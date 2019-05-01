import React, {Component} from 'react';
import MarketSummaryService from '../../Services/MarketSummaryService';

import './MarketSummary.css';

class MarketSummary extends Component {

    marketSummaryService = new MarketSummaryService();

    state = {
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
    

    componentDidMount(){

        this.marketSummaryService.get( this.props.symbol, ( newState ) => {
            console.log ("callback called :)");
            this.setState({
                symbol: this.props.symbol,
                name: this.props.name, 
                currency: this.props.currency ,                   
                marketSummary: newState.marketSummary,
                error: newState.error
            });
        } );
        console.log("did update");
                 
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