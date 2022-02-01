import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {

  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')

  useEffect(() =>
  axios
  .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  .then(res=>{
    setCoins(res.data);
    console.log(res.data);
  })
  .catch(error=>console.log(error)),[])
  
  const filterCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  return (
    < div className = "coin-app" >
      <div className='coin-search'>
        <h1>Search a Coin(Mayur Lodu)</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange}/>
        </form>
      </div>
      {
        filterCoins.map(coin =>{
          return(<Coin 
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            marketcap={coin.market_cap}
            priceChange={coin.market_cap_change_percentage_24h}
          />);
        })
      }
    </div >
  );
}

export default App;
