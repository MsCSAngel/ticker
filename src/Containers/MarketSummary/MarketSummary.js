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
            following: false,
            error: false
        };
    
    clickHandler = () => {
        let following = this.state.following;
        // toggle the following state;
        this.setState({
            following: !following
        });
    }

    componentDidMount(){

        this.marketSummaryService.get( this.props.symbol, ( newState ) => {

            this.setState({
                symbol: this.props.symbol,
                name: this.props.name, 
                currency: this.props.currency ,                   
                marketSummary: newState.marketSummary,
                error: newState.error
            });
        } );
                 
    }

    render(){

        let summary = null;
        if ( this.props.symbol !== null ) {
            summary = <p>Loading....</p>;
        } 

        if ( this.state.error ) {
            summary = <p>Uh oh, something went wrong......</p>
        }
        
        if ( !this.state.error && this.state.symbol != null) {            
                
            let changeClass = "positive";
            if (this.state.change < 0){
                changeClass = "negative";
            }   

            // set the button text and class
            let following = "Follow";
            let followClass = "follow";
             if ( this.state.following ){
                 following = "Following";
                 followClass = "following";
             }

            summary = (
                <div className="flex-container marketSummary">
                    <div className="marketSummaryTitle">
                        <p className="subTitle"><span > Market Summary ></span> <span>{this.state.name}</span></p>
                        <p>{this.state.symbol}</p>
                        <p><span className="price">{this.state.marketSummary.price}  {this.state.currency}</span> <span className={changeClass}> {this.state.marketSummary.change} ( {this.state.marketSummary.changePercent} )</span></p>
                        <p>{this.state.marketSummary.lastTradingDay}</p>
                    </div>
                    <div>                        
                        <button 
                            className={followClass}
                            onClick={this.clickHandler}>{following}
                            </button>
                    </div>
                    
                </div>
            )
        }             
        return summary;
    }

}

export default MarketSummary;