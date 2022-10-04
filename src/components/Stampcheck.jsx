import React, { Component } from 'react';
import Web3 from 'web3';
import renderNotification from '../utils/notification-handler';
import FileUploadComponent, { endpoint_val } from '../components/fileUpload.component';
import QRCode from 'react-qr-code';
import ReactFlagsSelect from "react-flags-select";


//const web3 = new Web3(provider);

class Stampcheck extends Component {
  constructor(props) {
    super(props)
  }


inputChangedHandler = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    const timestamp = Date.now();
    this.setState({dtx: timestamp});

   // console.log(this.state);
  }
  render() { 

    return (
      <div class="flex w-full items-center container center maincont" >
        <div class="fleft">
          <div class="container ">
            <div class="padd-30 newcont container justify-center">
              <h5  class="text-3xl sm:text-5xl text-black py-1 text-left" style={{ padding: "45px 0px 40px 0px" }}><b>Validate Digital Stamp</b></h5>
              <form class="form-gh">
                <div class="srch"><label class="left">Name</label><input id="name" class="validate" placeholder="A093LOP12XCVKDOPDJELR" type="text" class="validate" name="name" onChange={this.inputChangedHandler} />
 
                <button type="submit" className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
  <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
  <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
</svg><span>Validate Stamp</span></button></div>

<div class="results rectx ulbox">
<div>  <img height="100px" src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg"/></div>
<div class="rs-owner padd-gh text-1xl sm:text-2xl text-black text-left">Owner: <a href="https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/197">0xDaf572525c13A08A27f1BA67e06263AA658D920C</a> <br/>
     <b>NFT Address : <a href="https://opensea.io/assets/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/197">0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/197</a></b>
</div>
</div>
<br/><br/>

              </form>
            </div>


<div class="latest-stamps">
<div class="ls-title ps-abs">
<div class="flleft">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
</svg></div>
<div class="flleft"> <h3 class="text-2xl sm:text-4xl text-black py-1 text-left pl-10"><b>Recently generated stamps</b></h3></div>
<br/>
</div>

<div class="fleft"><br/>
<ul class="ulbox fleft">
<li><table class="table-auto border-collapse table-fixed w-full text-sm fleft">
  <thead>
    <tr>
      <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">STAMP CODE</th>
      <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Owner</th>
      <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Timestamp</th>
    </tr>
  </thead>
  <tbody class="bg-white dark:bg-slate-800">
    <tr>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="flleft pad-lh"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="cvg bi bi-code-slash" viewBox="0 0 16 16">
  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
</svg></div><div class="flleft pad-th"> A093LOP12XCVKDOPDJELR</div></td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">0xDaf572525c13A08A27f1BA67e06263AA658D920C</td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">2022-02-01 12:22:01</td>
    </tr>
    <tr>
     <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="flleft pad-lh"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="cvg bi bi-code-slash" viewBox="0 0 16 16">
  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
</svg></div><div class="flleft pad-th"> A093LOP12XCVKDOPDJELR</div></td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">0xDaf572525c13A08A27f1BA67e06263AA658D920C</td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">2022-02-01 12:22:01</td>
    </tr>
    <tr>
     <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="flleft pad-lh"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="cvg bi bi-code-slash" viewBox="0 0 16 16">
  <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
</svg></div><div class="flleft pad-th"> A093LOP12XCVKDOPDJELR</div></td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">0xDaf572525c13A08A27f1BA67e06263AA658D920C</td>
      <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">2022-02-01 12:22:01</td>
    </tr>
  </tbody>
</table>
</li>
<li><div class="rectx stat-box fleft">ART<br/>10232</div></li>

<li><div class="rectx stat-box fleft">Real-Estate<br/>2234</div></li>

<li><div class="rectx stat-box fleft">Music<br/>434</div></li>

</ul>
</div>
</div>


          </div>
        </div>
      </div >
    )
  }
}

export default Stampcheck;
