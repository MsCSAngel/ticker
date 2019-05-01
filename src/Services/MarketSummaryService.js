import axios from 'axios';

 class MarketSummaryService   {

    get = ( symbol, updateState )  => {

        let temp = {
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
        
        let url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&interval=5min&apikey=B5G0EY7TG8GPVXDU";        
        axios.get( url )
                .then( response => {                   
                    console.log ("got a response") ;
                   temp.marketSummary = this.mapMarketSummaryResponse( response.data );
                   console.log("temp ", temp);
                   updateState( temp );
                })
                .catch( error =>{
                    console.log("got an error");
                    temp.error = true;
                   updateState( temp );

                });                                    

    }

    /**
     * Maps api specific (Alpha Vantage) market summary data to a generic response object.
     * 
     * @param {*} data - data recieved from api call
     */
    mapMarketSummaryResponse =( data ) => {
        let marketSummary = {};
        let quote = null;
        if ( data["Global Quote"]){
            quote = data["Global Quote"];                            
            marketSummary.high = quote["03. high"];
            marketSummary.low = quote["04. low"];
            marketSummary.price = quote["05. price"];
            marketSummary.change = quote["09. change"];
            marketSummary.changePercent =  quote["10. change percent"];
            marketSummary.lastTradingDay = quote["07. latest trading day"];
        }

        return marketSummary;
    }
}

export default MarketSummaryService;