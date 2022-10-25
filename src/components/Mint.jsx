import React, { Component } from 'react';
import renderNotification from '../utils/notification-handler';
import FileUploadComponent, { endpoint_val } from '../components/fileUpload.component';
import QRCode from 'react-qr-code';
import ReactFlagsSelect from "react-flags-select";
import base64 from 'react-native-base64';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ethers } from "ethers";
import abi from '../utils/abi2/contracts/SmartCertificate.json';
import { ProgressBar } from  'react-loader-spinner'



const contractAddress = "0x375824c40f0d1ddb59783581be67929b95448b79";
const contractABI = abi.abi;

//const HDWalletProvider = require("@truffle/hdwallet-provider");
//const mnemonic ="friend whip cloth train trial there token auction convince capable link couch"; //"pass vital mad start beauty lonely feed able maid permit retire fire";
//const Web3 = require("web3");
//const provider = new HDWalletProvider(
//mnemonic,`https://rinkeby.infura.io/v3/0731fb561be54d6faf97e0db1a1b5988`);

//const web3 = new Web3(provider);


class Mint extends Component {
  constructor(props) {
    super(props)
  }

   state = {
    stamp: 'X0XXJJSSCCNNMMLL',
    value:'',
    cntx:'',
    code:'US',
    dtx:Date.now(),
    category:"Property",
    pbar:false,
    ptx:false,
    ptxurl:''
  }



  onCreateStamp = async (e) => {
    try {

this.setState({pbar: true})
const contractAddress = "0x375824c40f0d1ddb59783581be67929b95448b79";
const contractABI = abi.abi;
console.log(contractAddress);
        const {ethereum} = window;
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const mintProperty = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("minting property..")
      //  renderNotification('danger', 'Success', 'minting property..');

        const propertyTxn = await mintProperty.claimItem('https://ipfs.io/ipfs/QmNRRtBmnWq1Ld1yVuLENQWYtvSzouoP5WKrXqYwuRPKPx');

    //    const propertyTxn = await mintProperty.claimItem('https://ipfs.io/ipfs/QmVPuch5Whu4TL6bLg6Zb15mtJLDDsd3W32oy2rsXW3mSP');
      
        //await propertyTxn.wait();
                console.log("mined ", propertyTxn.hash);

        console.log("minting.. ", await propertyTxn.wait());

        console.log("mined ", propertyTxn.hash);
                this.setState({ptx: propertyTxn.hash})
                this.setState({ptxurl: "https://goerli.etherscan.io/tx/"+propertyTxn.hash})

                

        this.setState({pbar: false})

        console.log("Property minted!");

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
      <div class="flex w-full justify-center items-center container center" >
        <div class="pdd-30 row flleft">
          <div class="container ">
            <div class="container ">
              <h5  class="text-3xl sm:text-4xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>Smart Certificate (NFT) Wizard</b></h5>
            
<b class="prop-section flleft">Certificate Info</b><br />
              
                <label class="left">Title</label><input id="name" class="validate" placeholder="Title" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Description</label><input id="name" class="validate" placeholder="Description" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
 <label class="left">Blockchain (on wich blockchain you want to mint)</label>
                <select className="browser-default" name='category' value={this.state.category || undefined} onChange={this.selectHandler}>
                  <option value="ethereum">ETHEREUM</option>
                  <option value="near">NEAR</option>
                  <option value="Polygon">Polygon</option>
                  <option value="bsc">Binance Chain</option>
                </select>   

                <br />
             <b class="prop-section flleft">Ownership Management Info</b>

                <label class="left">Owner (address: 0x6EA4bB...4b1Bb6)</label><input id="owner" class="validate" placeholder="0x.." type="text" className="input-control" name="owner" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Creator/NFT site url - define a link to your own webpage with more details</label><input id="site_link" class="validate" placeholder="https://example.com" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Creator info / Additional info <i>(optional)</i></label><input id="crinfo" class="validate" placeholder="Lorem ipsum..." type="text" className="input-control" name="crinfo" onChange={this.inputChangedHandler} /><br />
        <br />
             <b class="prop-section flleft">Security Info</b>
             <label class="left">Number of Registration</label><input id="name" class="validate" placeholder="Deed Number" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
             <label class="left">Lockable Content</label><textarea maxlength="2000" class="textarea p-big-90" placeholder="access key, codes, link to a file, etc.)" name="description"></textarea><br /><br />
             <div class="stamp"><label class="left active">Delnorte Digital Stamp (Optional)</label><input disabled id="nftdigital" value={this.state.stamp} onChange={this.inputChangedHandler} placeholder="A0.." type="text" class="input-control" name="stamp"/>

            <label class="left active">Secret Code (to decode Deed Number)</label><input id="secretcode" onChange={this.inputChangedHandler} placeholder="***" type="password" class="input-control" name="secretcode"/>


              <b class="prop-section flleft">Propertyt Info</b><br/><br/>

              <p><label class="left"><b>Property Type</b></label></p>
                <select className="browser-default" name='category' value={this.state.category || undefined} onChange={this.selectHandler}>
                  <option value="Apartment">Apartment</option>
                  <option value="Building">Building</option>
                  <option value="Office">Office</option>
                  <option value="House">House</option>
                  <option value="Warehouse">Warehouse</option>
                  <option value="Сommercial premises">Сommercial premises</option>
                </select>   <br />
       <label class="left">Address (postcode, city)</label><input id="address" class="validate" placeholder="Address" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />         
       <label class="left">Original Price</label><input id="price" class="validate" placeholder="Price" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
<label class="left">Country code <i>(optional)</i></label>
<ReactFlagsSelect
        selected={this.state.code}
        onSelect={this.onSelect}
        countries={["US","CH","FR","UA","fi", "GB", "IE", "IT", "NL", "SE", "HN","DE"]}
        /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
      />
      <br/>
    <label class="left text-blacker">METADATA File - IPFS url <i>(optional)</i></label><input id="ipfsuri" class="validate" placeholder="QmaSZtLEUG6trc78PzWxHYp..." type="text" className="input-control" name="ipfsuri" onChange={this.inputChangedHandler} />
<button class="left bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={this.handleClick}>Fetch data from IPFS</button>                <br/><br/>
<br/><br/>
                <label class="left">Upload files (.pdf, .svg, .png, .jpg)</label>
                <div><div className="stampc App container mt-5"><FileUploadComponent /></div></div><br/>
                

               <h4 class="lgtitle-prop">Forever Royalties (optional*)</h4><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
  <button class="clipboard btncopyx shadowx">Add Address</button>
  <br/><br/>
               <h4 class="lgtitle-prop">Split Revenue</h4><br />
               <em>
                 Split revenue clears after each sale. Needs at least two accounts. The minter will receive 100% of split revenue unless splits are added.
               </em>
<br/>
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br />
  <button class="clipboard btncopyx shadowx">Add Address</button>

                <br/><br/><hr/>
<br/>


                </div>
                <p><button onClick={this.onCreateStamp} className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                {this.state.pbar && (
<center><ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#3f433f'
  barColor = '#ff9900'
/></center>
)}
                <span>MINT NFT Certificate</span></button></p>
               {this.state.ptx && ( <center>
                  NFT MIINTED at <a target="_blank" href={this.state.ptxurl}>{this.state.ptx}</a>
                </center>
)}
            </div>

          </div>
        </div>
        <div class="row flleft nftcontainer2 container">
          <div class="shadowx nftrow2 container rect-mint"><div>
          <p class="st-container">
            <div class="flleft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
</svg></div>
<div class="flleft"> <h3 class="text-2xl sm:text-4xl text-black py-1 text-left pl-10"><b>NFT Pre-render Details</b></h3></div></p>
</div><br/><br/>
  
    <div class="mint-render-line">
            <p class="left st-name"><b>{this.state.name}</b></p><br/>
            <p class="left st-owner shadowx">Owner: <a href="https://etherscan.io/address/{this.state.owner}">{this.state.owner}</a></p><br/>
    </div>
            
    <ul class="imposxx">


            <li class="render-left">
            <p class="left justify-center items-center center"><br/>
            <Carousel>
                <div class="shadowx">
                   <img class="shadow justify-center items-center center shadow" src="https://kasas.io/wp-content/uploads/2022/09/townhome-6-1399x899-1-705x450.jpeg" />
                    <p className="legend">{this.state.name}</p>
                </div>
                <div>
                   <img class="shadow justify-center items-center center shadow" src="https://wpmedia.roomsketcher.com/content/uploads/2021/12/14142150/RoomSketcher-3D-Site-Plan-Backyard-Design.jpg" />
                    <p className="legend">{this.state.name}</p>
                </div>
                <div>
                    <img src="https://wpmedia.roomsketcher.com/content/uploads/2021/12/14142150/RoomSketcher-3D-Site-Plan-Backyard-Design.jpg" />
                    <p className="legend">{this.state.name}</p>
                </div>
            </Carousel>
            </p>
            </li>

            <li class="render-right">      
              <ul class="pinfo">
              <li> <span><b>Property Info:</b></span></li>
              <li class="cv-line shadowx"><label>Type</label> <span>Townhouse</span></li>
              <li class="cv-line shadowx"><label>Number of Registration</label> <span>870978798890</span></li>
              <li class="cv-line shadowx"><label>Year Cconstruction</label> <span>2008</span></li>
              <li class="cv-line shadowx"><label>Name of Owner</label> <span>Max Masterman</span></li>
              <li class="cv-line shadowx"><label>Country</label> <span>US</span></li>
              <li class="cv-line shadowx"><label>Address</label> <span>East Elmhurst, NY 11370</span></li>
              <li class="cv-line shadowx"><label>Rooms</label> <span>4</span></li>
              <li class="cv-line shadowx"><label>Sq Ft</label> <span>235</span></li>
              <li class="cv-line shadowx"><label>Parking</label> <span>YES</span></li>
                            <li class="cv-price shadowx"><label>Price</label> <span>450 000$</span></li>
              <li class="doctext shadowx">Attached Files</li>
              <li class="docicons shadowx"><img src="https://freeiconshop.com/wp-content/uploads/edd/pdf-flat.png" /> <img src="https://freeiconshop.com/wp-content/uploads/edd/pdf-flat.png" /> <img src="https://freeiconshop.com/wp-content/uploads/edd/pdf-flat.png" /></li>
              </ul>
            </li>


</ul>

<div class="dstamp-mint">
  <ul class="ulbox"><li class="fleft lileft">
  <div class="fleft dsleft">
  <div class="stamp-preview">
  STAMP CODE: <b class="stamp-text"><a target="_blank" href="/stamp-check/X0XXXXXXXXXXXXXX">{this.state.stamp}</a></b><br/>
  TIMESTAMP: <b>{this.state.dtx}</b><br/>
  </div>
{this.state.stamp && (
<div class="jsblock fleft">
  <div class="code"><b>Metadata JSON</b>
  <p class="bquote">
  {`{"attributes":[{"trait_type":"STAMP",
                    "value":"`}{this.state.stamp}{`"}`}
  </p>
  </div>
  <center class="btncode"><br/>
  <button class="clipboard shadowx" onClick={this.onJsonLoad}>Download JSON STAMP</button>
</center>
</div>
)}
</div>
</li>
<li class="fleft liright">
<div class="fleft dvright">

{this.state.stamp && (
<div>
<div class="qrblock fleft qradd">
  <br/>
  <center>{this.state.stamp && (
          <QRCode
            size={156}
            title="Delnorte NFT Stamp"
            value={"https://sc.delnorte.space/check_stamp/"+this.state.stamp}/>
        )}
             </center>   <center>
  <button class="clipboard btncopy shadowx">Copy Url</button>
</center>
                </div>
</div>
)}


</div>
</li>
</ul>
</div>

<div class="empty-space"></div>
          </div>
        </div>
      </div >
    )
  }
}

export default Mint;
