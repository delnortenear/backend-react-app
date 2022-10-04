import React, { Component } from 'react';
import renderNotification from '../utils/notification-handler';
import FileUploadComponent from '../components/fileUpload.component';
import QRCode from 'react-qr-code';
import { TagsInput } from "react-tag-input-component";


let web3;
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
    stamp: '',
    value:''
  }

  onCreateStamp = async (e) => {
    try {
      e.preventDefault();

            this.setState({
      stamp: 'aGpoO2g7dWh1aDg5Nzg3ODk3ODc4Nw'
    });

            //console.log(this.state);

  console.log('aGpoO2g7dWh1aDg5Nzg3ODk3ODc4Nw==');
  renderNotification('success', 'Success', `Stamp  Minted Successfully!`);

    } catch (err) {
      console.log('Error while creating new stamp', err);
      //renderNotification('danger', 'Error', `${err.message}`);
    }
  }

inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state);

  }

  render() {     const { stamp } = this.state;

    return (
      <div class="flex w-full justify-center items-center container center" >
        <div class="row">
          <div class="container ">
            <div class="container ">
              <h5 class="lgtitle">Create NFT/Smart Certificate</h5>
              <form class="" onSubmit={this.onCreateStamp}>
               <h4 class="lgtitle">Basic Information</h4>
                <label class="left">NFT NAME</label><input id="name" class="validate" placeholder="Stamp Name" type="text" class="validate" name="name" onChange={this.inputChangedHandler} /><br /><br />
                <label class="left">Description</label><textarea maxlength="2000" class="textarea p-big-90" placeholder="Describe what this token represents" name="description"></textarea><br /><br />
                <div><div className="stampc App container mt-5"><FileUploadComponent /></div></div><br/><br/>
                <label class="left"><b>Category</b></label>
<select className="browser-default" name='ticket' value={this.state.ticket || undefined} onChange={this.selectHandler}>
                  <option value="">Select Category</option>
                  <option value="1">ART</option>
                  <option value="2">Music</option>
                  <option value="3">Property</option>
                  <option value="4">Moveable</option>
                  <option value="5">Event</option>
                  <option value="6">Game assets</option>
                  </select>   <br /><br />
                           
              <TagsInput name="tagsx" placeHolder="enter tags"/>
               <em>press enter to add new tag</em>
<br/>
               <h4 class="lgtitle">Forever Royalties (optional*)</h4>
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="1%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />

               <h4 class="lgtitle">Split Revenue</h4>
               <em>
                 Split revenue clears after each sale. Needs at least two accounts. The minter will receive 100% of split revenue unless splits are added.
               </em>
<br/>
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />
               <input id="name" value="25%" class="inputx2"/> <input id="name" class="inputx" placeholder=" account / wallet address" type="text"  name="name" onChange={this.inputChangedHandler} /><br /><br />

                <h4 class="lgtitle">ADD Stamp to NFT (optional*)</h4>
                <div class="stamp"><label class="left active">NFT Digital Stamp (Optional)</label><input id="nftdigital" value={this.state.stamp} onChange={this.inputChangedHandler} placeholder="NFT Digital Stamp" type="text" class="input-control" name="stamp"/>
                <br/><br/></div>
                <button type="submit" className="custom-btn login-btn">Generate Stamp</button>
                 <b> </b><button type="submit" className="custom-btn login-btn">Mint NFT</button>

<br/><br/>
               {this.state.stamp && (
<div class="rectx">
<div class="qrblock">
 <center> <b>{this.state.name}</b></center>
  <br/>
  {this.state.stamp && (
          <QRCode
            title="Delnorte NFT Stamp"
            value={"https://sc.delnorte.space/check_stamp/"+this.state.stamp}/>
        )}
                <center>
  <button class="clipboard">Click me to copy current Url</button>
</center>
                </div>
</div>
)}
              </form>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default Mint;
