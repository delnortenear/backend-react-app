//import Provider from './Provider';
import FestToken from './abi/contracts/FestToken.json';
import { ethers } from "ethers";

//const provider = new Provider();

class Token {
  constructor() {
    const {ethereum} = window;
    const deploymentKey = Object.keys(FestToken.networks)[0];
    const provider = new ethers.providers.Web3Provider(ethereum, "any");
    const signer = provider.getSigner();      

    //this.instance = new web3.eth.Contract(
     // FestToken.abi,
     // FestToken.networks[deploymentKey].address,
 //   );

     this.instance = new ethers.Contract(
          FestToken.networks[deploymentKey].address,
          FestToken.abi,
          signer
        );
  }

  getInstance = () => this.instance;
}

const token = new Token();
Object.freeze(token);

export default token.getInstance();