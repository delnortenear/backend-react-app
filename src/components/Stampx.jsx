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

class Stampx extends Component {
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
      <div class="flex w-full justify-center items-center container center" >
        <div class="pdd-30 row flleft">
          <div class="container ">
            <div class="container ">
              <h5  class="text-3xl sm:text-5xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>Mint Digital Stamp</b></h5>
              <form class="" onSubmit={this.onCreateStamp}>
                <label class="left">Name</label><input id="name" class="validate" placeholder="Stamp Name" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Owner (address: 0x6EA4bB...4b1Bb6)</label><input id="owner" class="validate" placeholder="0x.." type="text" className="input-control" name="owner" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Secret word (1-2 words)</label><input id="secret" class="validate" placeholder="Lorem ipsum..." type="text" className="input-control" name="secret" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Creator info / Additional info <i>(optional)</i></label><input id="crinfo" class="validate" placeholder="Lorem ipsum..." type="text" className="input-control" name="crinfo" onChange={this.inputChangedHandler} /><br />
<br />
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
                <div><div className="stampc App container mt-5"><FileUploadComponent /></div></div><br/><br/>
                <p><label class="left"><b>Category</b></label></p>
                <select className="browser-default" name='category' value={this.state.category || undefined} onChange={this.selectHandler}>
                  <option value="">Select Category</option>
                  <option value="ART">ART</option>
                  <option value="Music">Music</option>
                  <option value="Property">Property</option>
                  <option value="Metaverse">Mertaverse</option>
                  <option value="Real Assets">Real Assets</option>
                </select>   <br /><br />
                <div class="stamp"><label class="left active">NFT Digital Stamp (Optional)</label><input id="nftdigital" value={this.state.stamp} onChange={this.inputChangedHandler} placeholder="A0.." type="text" class="input-control" name="stamp"/>
                <br/><br/></div>
                <p><button type="submit" className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
  <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
</svg><span>Generate Stamp</span></button></p>
<br/><br/>

              </form>
            </div>

          </div>
        </div>
        <div class="row flleft nftcontainer container">
          <div class="shadowx nftrow container rectx"><div>
          <p class="st-container">
            <div class="flleft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
</svg></div>
<div class="flleft"> <h3 class="text-2xl sm:text-4xl text-black py-1 text-left pl-10"><b>NFT Pre-render Details</b></h3></div></p>
</div><br/><br/>
            <p class="left st-name">Name: <b>{this.state.name}</b></p><br/>
            <p class="left st-owner shadowx">Owner: <a href="https://etherscan.io/address/{this.state.owner}">{this.state.owner}</a></p><br/>
            <div class="impos">
            <p class="left st-image justify-center items-center center"><br/>
            <img class="justify-center items-center center shadow" src="https://img.seadn.io/files/9a6b949cb32ade3ebf4b9c20417dc2c8.png?auto=format&fit=max&w=640"/>
            </p>
            </div><br/>
<p>
<div class="dstamp">
<ul class="ulbox"><li class="fleft lileft">
<div class="fleft dsleft">
<div class="stamp-preview">
STAMP CODE: <b class="stamp-text"><a target="_blank" href="/stamp-check/X0XXXXXXXXXXXXXX">X0XXXXXXXXXXXXXX</a></b><br/>
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
</p>
          </div>
        </div>
      </div >
    )
  }
}

export default Stampx;
