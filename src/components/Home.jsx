import React, { Component } from 'react';
import Web3 from 'web3';
import renderNotification from '../utils/notification-handler';
import FileUploadComponent, { endpoint_val } from '../components/fileUpload.component';
import QRCode from 'react-qr-code';
import ReactFlagsSelect from "react-flags-select";

let web3;
//const HDWalletProvider = require("@truffle/hdwallet-provider");
//const mnemonic ="friend whip cloth train trial there token auction convince capable link couch"; //"pass vital mad start beauty lonely feed able maid permit retire fire";
//const Web3 = require("web3");
//const provider = new HDWalletProvider(
//mnemonic,`https://rinkeby.infura.io/v3/0731fb561be54d6faf97e0db1a1b5988`);

//const web3 = new Web3(provider);

class Home extends Component {
  constructor(props) {
    super(props)
  }

   state = {
    stamp: '',
    value:'',
    cntx:'',
    code:'US',
    dtx:Date.now(),
    category:"ART"
  }




  onCreateStamp = async (e) => {
    try {
      e.preventDefault();

            this.setState({stamp: 'X0XXXXXXXXXXXXXX'});

            //console.log(this.state);

  console.log('aGpoO2g7dWh1aDg5Nzg3ODk3ODc4Nw==');
     // renderNotification('success', 'Success', `Stamp  Minted Successfully!`);

    } catch (err) {
      console.log('Error while creating new stamp', err);
      //renderNotification('danger', 'Error', `${err.message}`);
    }
  }


  onJsonLoad = () => { 
  const datax = ({
    stampId: this.state.stamp,
    owner: this.state.owner,
    nftUri: this.state.ipfsuri,
    creatorInfo:this.state.crinfo,
    countryCode:this.state.code,
    category:this.state.category,
    timestamp:this.state.dtx
  });
  
console.log (datax);
const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(datax)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "digital-stamp.json";

    link.click();


  }
  handleClick = async () => {
    //setIsLoading(true);

    try {
      const response = await fetch('https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/9010', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      this.setState({cntx:result});
    } catch (err) {
      console.log(err.message);
    } finally {
      //setIsLoading(false);
    }
  };

onSelect = (code) => this.setState({country: code});

inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    const timestamp = Date.now();
    this.setState({dtx: timestamp});

   // console.log(this.state);
  }
  render() {  const { stamp } = this.state;

    return (
      <div class="flex w-full justify-center items-center container mxhome center" >
        <div class="row flleft">
          <div class="container mxhome">
            <div class="container home-hd section1">
            <div class="lf-home">
              <h5  class="text-3xl sm:text-5xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>Tokenization of Real Assets</b></h5>
              <h5 class="text-black home5t text-left">Digital securities is disrupting various industries. Tokenize high value assets like real estate, fine arts, mines, technology, minerals and even projects through blockchain for secure transactions.</h5>
<div class="home-head-btn">
  <a class="clipboard shadowx cx" href="/stampx">DIGITAL STAMP</a>
  <a class="clipboard shadowx" href="/mint">Smart Sertificate (NFT)</a>
  <a class="clipboard shadowx" href="/fnft">F-NFT</a>


</div>

</div>
<div class="fright">
<img src="https://assets-global.website-files.com/61effee4b1bc1e9898a4c086/62cda21819f63d18736fa2e6_Tokenized%20real%20estate%20investing%20featured.svg" />
</div>

</div>

         <div class="container home-hd section2 shadowx">
            <div class="lf-home2">
              <h5  class="text-3xl sm:text-5xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>Fractional Ownership
</b></h5>
              <h5 class="text-black home5t text-left">Tokenization allows fractional ownership where you can split the value of shares and also their ownership. This helps to sell the entire property or transfer part of the ownership.</h5>
<div class="home-head-btn2">
   <b class="fleft-home">For every NFT, user can set:</b><br/>
  <ul class="fnft-f">
  <li><a class="clipboard2 shadowx cx" href="/stampx">Amount of Token Shares</a></li>
  <li><a class="clipboard2 shadowx" href="/mint">Set Token (Share) Price</a></li>
  <li><a class="clipboard2 shadowx" href="/fnft">Define Income</a></li>
  <li><a class="clipboard2 shadowx" href="/fnft">Escrow Service</a></li>
  <li><a class="clipboard2 shadowx" href="/fnft">Define reward distribution logic</a></li>
</ul>

<br/>
  <a class="clipboard shadowx btx-fnft" href="/fnft">Create F-NFT</a>



</div>

</div>
<div class="fright2">
<img src="https://kasas.io/wp-content/uploads/2022/10/8787878.png" />
</div>

</div>

  <div class="container home-hd section3">
            <div class="lf-home2">
              <h5  class="text-3xl sm:text-5xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>DIGITAL STAMP
</b><br/><span class="proof-text">(Proof of Ownership)</span></h5>
              <h5 class="text-black home5t text-left">Generate a digital stamp to authenticate any NFT or Digital Entity.<br/>
The algorithm will generate a unique code in which the asset data is encrypted.</h5>
<div class="home-head-btn2">
   <b class="fleft-home2x">Example of STAMP:</b>
  <ul class="fnft-f">
  <li><a class="clipboard shadowx cx" href="/stampx"> X0PXM43431NKIOP3 </a></li>
</ul>

</div>

</div>
<div class="fright2x">
<img src="https://kasas.io/wp-content/uploads/2022/10/737737399303.png" />
</div>

</div>


  <div class="container home-hd section4">
            <div class="lf-home2y">
<div class="home-head-btn2">
</div>

</div>
<div class="fright5x">
  <img src="https://kasas.io/wp-content/uploads/2022/10/234234235253.png" />

</div>

</div>


          </div>
        </div>
      </div >
    )
  }
}

export default Home;
