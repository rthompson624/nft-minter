import React from "react";

export default function List({ nftRecords }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {
        nftRecords.map(nft => {
          const imagePath = `url(/nft-images/${nft.id}.png)`;
          return (
            <div
              className="rounded border-2 border-gray-200 hover:shadow-lg hover:cursor-pointer flex flex-col"
              key={ nft.id }
            >
              <div className="h-48 bg-no-repeat bg-contain bg-center" style={{ backgroundImage: imagePath }}></div>
              <div className="flex flex-nowrap justify-between mt-4 p-2">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">Dude</div>
                  <div className="text-sm font-bold">{ nft.name }</div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-sm font-bold">0.05</div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
