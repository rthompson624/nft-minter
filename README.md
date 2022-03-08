# Groovy Dudes NFT Collection

This project consists of the Ethereum contracts to manage the Groovy Dudes NFT collection.

## Local Development Environment

1. Start Ganache.
2. Connect Metamask wallet. Choose the "import using Secret Recovery Phrase" option using the mnemonic from Ganache.
3. Compile contracts `truffle compile`
4. Deploy contracts to Ganache blockchain `truffle migrate --reset --network development`
5. In a shell window navigate to /client and start Tailwind dev server `npm run watch:css`
6. In another shell window navigate to /client and start the React dev server `npm run start`
7. Open browser to http://localhost:3000/

## Production Environment

### Blockchain

1. Export environment variables in `.env`.
2. Compile contracts `truffle compile`
3. Deploy contracts to Rinkeby blockchain `truffle migrate --reset --network rinkeby`
4. In a shell window navigate to /client and start Tailwind dev server `npm run watch:css`
5. In another shell window navigate to /client and start the React dev server `npm run start`
6. Open browser to http://localhost:3000/

### Web Hosting

1. Build project with `npm run build`
2. Deploy using cli command `firebase deploy --only hosting`
3. Test at https://groovy-dudes.web.app
4. Test at https://groovydudesnft.com

