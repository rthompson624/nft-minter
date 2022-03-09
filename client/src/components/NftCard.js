import React from "react";

export default function NftCard({ nft, onMint }) {
  const imagePath = `url(/nft-images/${nft.id}.png)`;
  return (
    <div className="rounded border-2 border-gray-200 hover:shadow-lg flex flex-col px-2 py-3 font-mono">
      <div className="h-48 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: imagePath }}></div>
      <div className="flex flex-nowrap justify-between py-3">
        <div className="flex flex-col">
          <div className="text-gray-500">Name</div>
          <div className="font-bold">{ nft.name }</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-gray-500">Price</div>
          <div className="font-bold">0.05</div>
        </div>
      </div>
      {
        nft.attributes.map(attribute => {
          return (
            <div
              className="flex flex-nowrap justify-between"
              key={ attribute.trait_type }
            >
              <div className="text-gray-500">{ attribute.trait_type }</div>
              <div className="font-bold text-right">{ attribute.value }</div>
            </div>
          )
        })
      }
      <div className="flex flex-nowrap justify-center">
        {nft.minted
          ?<div className="text-green-500 font-mono font-bold text-lg">Minted</div>
          :<button className="px-4 py-1 bg-blue-600 rounded-lg font-mono font-bold text-lg text-white hover:bg-cyan-500" onClick={ () => onMint(nft.id) }>Mint</button>
        }
      </div>
    </div>
  )
}
