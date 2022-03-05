import React from "react";
import { weiToEth } from "../utils";

export default function Admin({ groovyDudesTokenContract, account, setToastMessage }) {
  const [balance, setBalance] = React.useState(0);

  // Component load event
  React.useEffect(() => {
    getContractBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getContractBalance() {
    const balanceInquiry = await groovyDudesTokenContract.methods.getContractBalance().call();
    setBalance(weiToEth(balanceInquiry));
  }

  async function payoutToContractOwner() {
    await groovyDudesTokenContract.methods.payoutToContractOwner().send({ from: account });
    getContractBalance();
    setToastMessage({
      type: 'success',
      message: 'Payout executed successfully.'
    });
  }

  return (
    <div className="flex justify-center mt-5 h-96 items-start">
      <div className="flex items-end">
        <div className="mb-3 w-48">
          <label htmlFor="exampleFormControlInput5" className="form-label inline-block mb-2 text-gray-700 font-mono font-bold">
            Contract Balance
          </label>
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-mono text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleFormControlInput5"
            value={ `${balance} ETH` }
            aria-label="Balance"
            readOnly
          />
        </div>
        <div className="ml-5 mb-3">
          <button
            type="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={ () => payoutToContractOwner() }
          >
            Payout
          </button>
        </div>
      </div>
    </div>  
  );
}
