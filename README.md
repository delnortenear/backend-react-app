

### Running the application
##### Prerequisite
1. Docker
2. Metamask plugin for browser

##### Steps
1. Clone the project.
2. Start the docker application.
3. Run the below command from the root directory to run the ethereum client and deploy the smart contracts to the network.
    ```sh
    docker-compose up --build
    ```
4. Note down first couple of private keys from the output logs.
5. Note down the FestToken contract address.
4. Run the below command from `./client` directory to run the react application.
    ```sh
    docker-compose up --build
    ```
5. React application will be accessible at `http://localhost:3000/`.
6. Configure the Metamask with RPC url `http://0.0.0:8545`.
7. Import the accounts in the metamask by taking 1st private key from step 4 and setting it as an organiser. Add couple more accounts in metamask to act as a customers.
8. Add new FEST token in metamask using the contract address from step 5.
9. Transfer some amount of FEST tokens from organiser to other cutomers using metamask for testing the application.
10. Set up is completed and now the organiser account will be able to add new festival and customers will be able to purchase/sell the tickets.

### Future Roadmap
##### Tech debt
1. Add clone factory pattern (ERC1167 implementation) for the FestiveTicketsFactory smart contract which uses delegate calls to save the gas cost for the contract deployment.
2. Reduce the gas consumption for the the bulk minting of tickets. Once solution to do is to modify the openzeppelin's ERC721 contract such that its constructor will be able to directly initialize the required values to its state variables instead of updating the state variable again and again which consumes more gas than operating on memory.
3. Add unit test cases covering all the scenarios.

##### Feature debt
1. Add one click login option using metamask and add public and private routes.
2. Add option to burn the ERC721 token during check in.
3. Add option to withdraw tickets from sale.

### Screenshots

![Create Festival](./screenshots/create-festival.png)
![Purchase Ticket](./screenshots/purchase-ticket.png)
![Resale Ticket](./screenshots/resale-error.png)
![Secondary Market](./screenshots/secondary-market.png)
