# Groovy Dudes NFT Collection

This project consists of the Ethereum contracts to manage the Groovy Dudes NFT collection.

## Local Development Environment Setup

1. Start Ganache.
2. Connect Metamask wallet. Choose the "import using Secret Recovery Phrase" option using the mnemonic from Ganache.
3. In project root, compile contracts `truffle compile`
4. In project root, deploy contracts to Ganache blockchain `truffle migrate --reset --network development`
5. In a shell window, navigate to /client and start Tailwind dev server `npm run watch:css`
6. In another shell window, navigate to /client and start the React dev server `npm run start`
7. Open browser to http://localhost:3000/

## Production Deployment

### Blockchain

1. In project root, export environment variables in `.env`.
2. In project root, compile contracts `truffle compile`
3. In project root, deploy contracts to Rinkeby blockchain `truffle migrate --reset --network rinkeby`

### Web Hosting

1. In /client directory, build project with `npm run build`
2. In /client directory, deploy using cli command `firebase deploy --only hosting`
3. Test at https://groovydudesnft.com

