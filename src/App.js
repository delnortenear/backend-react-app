

// Importing modules
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import { ethers } from "ethers";
import Festival from './components/Festival';
import Purchase from './components/Purchase';
import MyTickets from './components/MyTickets';
import SecondaryMarket from './components/SecondaryMarket';
import Stampx from './components/Stampx';
import Mint from './components/Mint';
import Stampcheck from './components/Stampcheck';


function App() {

const [currentAccount, setCurrentAccount] = useState("");
const [balanceAccount, setBalanceAccount] = useState("");

  // Asking if metamask is already present or not
  if (window.ethereum) {
  // res[0] for fetching a first wallet
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => accountChangeHandler(res[0]));
  } else {
  alert("install metamask extension!!");
  }

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

  // Asking if metamask is already present or not
  if (window.ethereum) {
  // res[0] for fetching a first wallet
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => accountChangeHandler(res[0]));
  } else {
  alert("install metamask extension!!");
  }
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

  // Requesting balance method
  window.ethereum
  .request({
    method: "eth_getBalance",
    params: [address, "latest"]
  })
  .then((balance) => {
    setBalanceAccount(ethers.utils.formatEther(balance).substring(0,3));
    // Setting balance
  });
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
  
  setCurrentAccount(account.substring(0,5)+"..."+account.substring(account.length - 5));

  // Setting a balance
  getbalance(account);
};
console.log('address:');
console.log(currentAccount);

return (
  <Router>
        <div className="App gradient-bg-welcome">
          <nav>
            <div class="nav-wrapper">
              <a href="/buyTickets" class="brand-logo left"><img id="logox" height="40px" src="https://delnorte.space/images/logo.svg"/> </a>
              <ul class="right hide-on-med-and-down 10" >
                <div>
                  <li> <Link to="/stampx"><b>Stamp Mint</b></Link> </li>
                  <li> <Link to="/stampcheck"><b>Check Stamp</b></Link> </li>
                  <li> <Link to="/mint"><b>MINT SC NFT</b></Link> </li>
                  <li> <Link to="/createFestival">Add Event</Link> </li>
                  <li> <Link to="/buyTickets">Buy Tickets</Link> </li>
                  <li> <Link to="/market">Secondary Market</Link> </li>
                  <li> <Link to="/tickets">My NFT</Link> </li>
                  <li >
                  {currentAccount !== 'undefined' &&  currentAccount !== null && currentAccount !=="" ? 
                          <form className="d-flex">
                              <div className="dropdown">
                                  <button className="btn btn-primary dropdown-toggle" type="button"  data-toggle="dropdown">Account: {currentAccount} ({balanceAccount} ETH)
                                  <span className="caret"></span></button>
                                  
                              </div>
                          </form>
                          : 
                          <button variant="contained" onClick={btnhandler}>
                            Connect Wallet
                          </button>
                        }
                  </li>
                </div>

              </ul>
            </div>
          </nav>
          <Switch>
            <Route path="/createFestival" component={Festival}/>
            <Route path="/buyTickets" component={Purchase}/>
            <Route path="/market" component={SecondaryMarket}/>
            <Route path="/tickets" component={MyTickets}/>
            <Route path="/stampx" component={Stampx}/>
            <Route path="/stampcheck" component={Stampcheck}/>
            <Route path="/mint" component={Mint}/>
          </Switch>
        </div>
      </Router>
);
}

export default App;
