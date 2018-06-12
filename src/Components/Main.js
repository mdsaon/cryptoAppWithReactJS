import React, { Component } from 'react';
import './Main.css';
import Cryptocurrency from './Cryptocurrency';
import axios from 'axios';

class Main extends Component {
	//defining the state
	constructor(props){
		super(props);
		this.state = {
			search: "",
			data: [
			{
				id: "bitcoin",
                name: "Bitcoin",
                symbol: "BTC",
                price_usd: "1",
                percent_change_1h: "0",
                percent_change_24h: "0",
                percent_change_7d: "0",
            },
            {
                id: "ethereum",
                name: "Ethereum",
                symbol: "ETH",
                price_usd: "1",
                percent_change_1h: "0",
                percent_change_24h: "0",
                percent_change_7d: "0",
            },
            {
                id: "litecoin",
                name: "Litecoin",
                symbol: "LTC",
                price_usd: "1",
                percent_change_1h: "0",
                percent_change_24h: "0",
                percent_change_7d: "0",
            }
				]
			};
			this.searchHandler = this.searchHandler.bind(this);
			this.sortByPrice = this.sortByPrice.bind(this);
			this.sortByName = this.sortByName.bind(this);
		}
	//sorting data by name
	sortByName(){
		this.setState({data:this.state.data.sort((a, b) => a.name > b.name)})
	}
	//sorting data by price
	sortByPrice(){
		this.setState({data:this.state.data.sort((a, b) => a.price_usd < b.price_usd)})
	}
	//filter data by searching
	searchHandler(e){
		this.setState({search:e.target.value});
	}	
	//get the real data
	   fetchCryptocurrencyData() {
        axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=12")
            .then(response => {
                var wanted = ["bitcoin", "ethereum", "litecoin","tron","eos","ripple","carvertical","stellar","cardano","iota","neo","tether"];
                var result = response.data.map(currency => currency);
                //var result = response.data.filter(currency => wanted.includes(currency.id));
                this.setState({ data: result});
            })
            .catch(err => console.log(err));
    }
    //call the function after a while
     componentDidMount() {
        this.fetchCryptocurrencyData();
        this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
    }	
	//render the items	
	  render() {
	  			let filtereddItems = this.state.data.filter(
	  				(currency) =>{
	  					return currency.name.indexOf(this.state.search) !== -1;
	  				}
	  			);
	  		  	let allItems = filtereddItems.map((currency) =>
	  		  		<Cryptocurrency data={currency} key={currency.id} />

	  			);
	  	return ( 
	  		<div className="main-content">
	  		<br />
	  		<form><input type="text" onChange={this.searchHandler}/></form>
	  		<br />
	  		<button onClick={this.sortByName}>SortByName</button>
	  		<button onClick={this.sortByPrice}>SortByPrice</button>
	  			<ul className ="allItems">{allItems}</ul>
	  		
	  		</div>
	  	);
	 }
}


export default Main;