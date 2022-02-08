import React from "react";

export default function List({ nftRecords, onMint }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {
        nftRecords.map(nft => {
          const imagePath = `url(/nft-images/${nft.id}.png)`;
          return (
            <div
              className="rounded border-2 border-gray-200 hover:shadow-lg flex flex-col px-2 py-3"
              key={ nft.id }
            >
              <div className="h-48 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: imagePath }}></div>
              <div className="flex flex-nowrap justify-between py-3">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Name</div>
                  <div className="text-sm font-bold">{ nft.name }</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-sm font-bold">0.05</div>
                </div>
              </div>
              {
                nft.attributes.map(attribute => {
                  return (
                    <div
                      className="flex flex-nowrap justify-between"
                      key={ attribute.trait_type }
                    >
                      <div className="text-sm text-gray-500">{ attribute.trait_type }</div>
                      <div className="text-sm font-bold text-right">{ attribute.value }</div>
                    </div>
                  )
                })
              }
              <div className="flex flex-nowrap justify-center">
                {nft.minted
                  ?<div className="text-green-500 font-mono font-bold">Minted</div>
                  :<button className="px-2 bg-blue-600 rounded-lg font-mono font-bold text-white hover:bg-cyan-500" onClick={ () => onMint(nft.id) }>Mint</button>
                }
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
