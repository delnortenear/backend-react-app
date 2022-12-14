// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FestivalNFT.sol";
import "./FestivalMarketplace.sol";
contract FestiveTicketsFactory is Ownable {
    struct Festival {
        string festName;
        string festSymbol;
        uint256 ticketPrice;
        uint256 totalSupply;
        address marketplace;
    }
    address[] private activeFests;
    mapping(address => Festival) private activeFestsMapping;
    event Created(address ntfAddress, address marketplaceAddress);
    function createNewFest(DTVToken token,string memory festName, string memory festSymbol, uint256 ticketPrice, uint256 totalSupply) public onlyOwner returns (address) {
    FestivalNFT newFest =  new FestivalNFT(festName, festSymbol,ticketPrice,totalSupply,msg.sender);
    FestivalMarketplace newMarketplace = new FestivalMarketplace(token, newFest);
    address newFestAddress = address(newFest);
    activeFests.push(newFestAddress);
    activeFestsMapping[newFestAddress] = Festival({
    festName:festName,
    festSymbol:festSymbol,
    ticketPrice:ticketPrice,
    totalSupply:totalSupply,
    marketplace:address(newMarketplace)});
    emit Created(newFestAddress, address(newMarketplace));
    return newFestAddress;
    }
    function getActiveFests() public view returns (address[] memory) {
        return activeFests;
    }
    function getFestDetails(address festAddress) public view returns (string memory,string memory,uint256,uint256,address) {
   return (activeFestsMapping[festAddress].festName,activeFestsMapping[festAddress].festSymbol,activeFestsMapping[festAddress].ticketPrice,activeFestsMapping[festAddress].totalSupply,activeFestsMapping[festAddress].marketplace);
    }}