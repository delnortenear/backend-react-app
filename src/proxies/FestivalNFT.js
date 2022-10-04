import Provider from './Provider';
import { festivalNFTABI } from '../constants';

const provider = new Provider();

const FestivalNFT = (contractAddress) => {
  const web3 = provider.web3;

console.log('contrL :'+contractAddress);
  return new web3.eth.Contract(festivalNFTABI, contractAddress);
};

export default FestivalNFT;