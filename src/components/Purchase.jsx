import React, { Component } from 'react';
//import Web3 from 'web3';
//import festivalFactory from '../proxies/FestivalFactory';
//import FestivalNFT from '../proxies/FestivalNFT';
//import FestivalMarketplace from '../proxies/FestivalMarketplace';
//import festToken from '../proxies/FestToken';
import renderNotification from '../utils/notification-handler';
import { ethers } from "ethers";
import FestivalFactoryABI from './abi/contracts/FestiveTicketsFactory.json';
import { festivalNFTABI } from '../constants';
import { festivalMarketplaceABI } from '../constants';
import FestToken from './abi/contracts/FestToken.json';


//const HDWalletProvider = require("@truffle/hdwallet-provider");
//const mnemonic ="friend whip cloth train trial there token auction convince capable link couch"; //"pass vital mad start beauty lonely feed able maid permit retire fire";
//const Web3 = require("web3");
//const provider = new HDWalletProvider(
 // mnemonic,
 // `https://rinkeby.infura.io/v3/0731fb561be54d6faf97e0db1a1b5988`
//);
//const web3 = new Web3(provider);

class Purchase extends Component {
  constructor() {
    super();

    this.state = {
      festivals: [],
    };

const {ethereum} = window;

if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();  
        const address_b = signer.getAddress()
        };
      }

  async componentDidMount() {
  await this.updateFestivals();
  }

  updateFestivals = async () => {
    try {

      const {ethereum} = window;
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();  
      const deploymentKey = Object.keys(FestivalFactoryABI.networks)[0];
      const ct_address = "0xbceb2cBEc6Fe7A631b6fb19c6E46c557C0966668"//FestivalFactoryABI.networks[deploymentKey].address;
      console.log("FestivalFactoryABI:"+ct_address);

      const address_b = signer.getAddress();  
      //console.log("Buyer:"+buyer);

      const festivalFactory = new ethers.Contract(
          ct_address,
          FestivalFactoryABI.abi,
          signer
        );

      const FestivalNFT = (contractAddress) => {
                console.log('contrP :'+contractAddress);
        return new ethers.Contract(
          contractAddress,
          festivalNFTABI,
          signer
        );
        console.log('contrL :'+contractAddress);
      };


        console.log("fest addr:"+ct_address+" s-addr"+signer.getAddress());
        const initiator = "0x403259adb35df3c7647d51a9ca2d20917bf32a4c";//await web3.eth.getCoinbase();
        console.log("initiator:"+initiator);
        console.log('a-activeFests');
        const activeFests = await festivalFactory.getActiveFests();
        console.log(activeFests);
        console.log('e-activeFests');

        const fests = await Promise.all(activeFests.map(async fest => {
        const festDetails = await festivalFactory.getFestDetails(fest);
        const [festName, festSymbol, ticketPrice, totalSupply, marketplace] = Object.values(festDetails);
        const nftInstance = await FestivalNFT(fest);
        const saleId = await nftInstance.getNextSaleTicketId();

        return (
          <tr key={fest}>
            <td class="center">{festName}</td>
            <td class="center">{ethers.utils.formatEther(ticketPrice)}</td>
            <td class="center">{totalSupply - saleId}</td>

            <td class="center"><button type="submit" className="custom-btn login-btn" onClick={this.onPurchaseTicket.bind(this, marketplace, ticketPrice, initiator)}>Buy</button></td>
          </tr>
        );
      }));

      this.setState({ festivals: fests });
    } catch (err) {
      //renderNotification('danger', 'Error', err.message);
      console.log('Error while updating the fetivals', err);
    }
  }

  onPurchaseTicket = async (marketplace, ticketPrice, initiator) => {
    try {

      const {ethereum} = window;
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();  
      const deploymentKey = Object.keys(FestToken.networks)[0];
      console.log('cbh---:'+FestToken.networks[deploymentKey].address);

        const FestivalMarketplace = (contractAddress) => {
        console.log('contr FM :'+contractAddress);
        return new ethers.Contract(
          contractAddress,
          festivalMarketplaceABI,
          signer
        );
      };

      const festToken = new ethers.Contract(
          FestToken.networks[deploymentKey].address,
          FestToken.abi,
          signer
        );

      //const buyer = await web3.eth.getCoinbase();
      //console.log("initiator:"+initiator+"ticet"+ticketPrice);
      console.log(marketplace+":"+ticketPrice+":"+initiator);
      const marketplaceInstance = await FestivalMarketplace(marketplace);
      console.log('marketplaceInstance:');
      await festToken.approve(marketplace, ticketPrice);//.send({ from: initiator, gas: 6700000 });
      console.log('Fest t methods:');
      await marketplaceInstance.purchaseTicket();//.send({ from: initiator, gas: 6700000 });
      console.log('Purchase:');
      await this.updateFestivals();

      renderNotification('success', 'Success', `Ticket for the Festival purchased successfully!`);
    } catch (err) {
      console.log('Error while creating new festival', err);
      renderNotification('danger', 'Error', err.message);
    }
  }

  inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div class="container " class="col s12 m6 offset-m3 l4 offset-l4 z-depth-6 card-panel">
        <h4 class="center">Purchase Tickets</h4>
        <table id='requests' class="responsive-table striped" >
          <thead>
            <tr>
              <th key='name' class="center">Name</th>
              <th key='price' class="center">Price(in FEST)</th>
              <th key='left' class="center">Tickets Left</th>
              <th key='purchase' class="center">Purchase</th>
            </tr>
          </thead>
          <tbody class="striped highlight">
            {this.state.festivals}
          </tbody>
        </table>
      </div >
    )
  }
}

export default Purchase;  