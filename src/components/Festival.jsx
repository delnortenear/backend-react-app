import React, { Component } from 'react';
import Web3 from 'web3';
import festivalFactory from '../proxies/FestivalFactory';
import festToken from '../proxies/FestToken';
import FestivalNFT from '../proxies/FestivalNFT';
import renderNotification from '../utils/notification-handler';
import { ethers } from "ethers";

let web3;
//const HDWalletProvider = require("@truffle/hdwallet-provider");
//const mnemonic ="friend whip cloth train trial there token auction convince capable link couch"; //"pass vital mad start beauty lonely feed able maid permit retire fire";
//const Web3 = require("web3");
//const provider = new HDWalletProvider(
//mnemonic,`https://rinkeby.infura.io/v3/0731fb561be54d6faf97e0db1a1b5988`);

//const web3 = new Web3(provider);

class Festival extends Component {
  constructor() {
    super();

    this.state = {
      name: null,
      symbol: null,
      price: null,
      suppply: null,
    };

    web3 = new Web3(window.ethereum);
  }

  onCreateFestival = async (e) => {
    try {
      e.preventDefault();
      const organiser = "0x403259adb35df3c7647d51a9ca2d20917bf32a4c";
      const {ethereum} = window;
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();        
     console.log(organiser);
      const { name, symbol, price, supply } = this.state;
      console.log(festToken._address);
            console.log('start');

      const { events: { Created: { returnValues: { ntfAddress, marketplaceAddress } } } } = await festivalFactory.methods.createNewFest(
        festToken._address,
        name,
        symbol,
        ethers.utils.formatEther(price),
        supply
      ).send({ from: organiser, gas: 6700000 });
                  console.log('end');

      //renderNotification('success', 'Success', `Festival Created Successfully!`);
      console.log(ntfAddress);

      const nftInstance = await FestivalNFT(ntfAddress);
      const batches = Math.ceil(supply / 30);
      let batchSupply = 30;
      let curCount = 0
      let prevCount = 0

      if (supply < 30) {
        const res = await nftInstance.methods.bulkMintTickets(supply, marketplaceAddress).send({ from: organiser, gas: 6700000 });
      } else {
        for (let i = 0; i < batches; i++) {
          prevCount = curCount;
          curCount += 30;
          if (supply < curCount) {
            batchSupply = supply - prevCount;
          }
          const res = await nftInstance.methods.bulkMintTickets(batchSupply, marketplaceAddress).send({ from: organiser, gas: 6700000 });
        }
      }
    } catch (err) {
      console.log('Error while creating new festival', err);
     // renderNotification('success', 'Success', `Festival Created Successfully!`);
      //renderNotification('danger', 'Error', `${err.message}`);
    }
  }
onCreateStamp = async (e) => {
    try {
      e.preventDefault();

            this.setState({
      stamp: 'aGpoO2g7dWh1aDg5Nzg3ODk3ODc4Nw'
    });

            //console.log(this.state);

  console.log('aGpoO2g7dWh1aDg5Nzg3ODk3ODc4Nw==');
     // renderNotification('success', 'Success', `Stamp  Minted Successfully!`);

    } catch (err) {
      console.log('Error while creating new stamp', err);
      //renderNotification('danger', 'Error', `${err.message}`);
    }
  }
  inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.setState);
    const bs4 = "jsdkljklsjdl";
    console.log(bs4.toString('Base64'))
  }

  render() {
    return (
      <div class="container center" >
        <div class="row">
          <div class="container ">
            <div class="container ">
            <br/>
              <h5 class="lgtitle">Tokenize Event</h5>
              <form class="" onSubmit={this.onCreateFestival}>
                <label class="left">Fest Name</label><input id="name" class="validate" placeholder="Fest Name" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Fest Symbol</label><input id="symbol" class="validate" placeholder="Fest Symbol" type="text" className="input-control" name="symbol" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Ticket Price</label><input id="price" placeholder="Ticket Price" type="text" className="input-control" name="price" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Total Supply</label><input id="supply" placeholder="Total SUpply" type="text" className="input-control" name="supply" onChange={this.inputChangedHandler}></input><br /><br />
                <div class="stamp"><label class="left active">NFT Digital Stamp (Optional)</label><input id="nftdigital" placeholder="NFT Digital Stamp" type="text" class="input-control" name="nftstamp"/>
                <button onclick={this.onCreateStamp} >Generate Stamp</button><br/><br/></div>
                <button type="submit" className="custom-btn login-btn">Create Event</button>
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Festival;
