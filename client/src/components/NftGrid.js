import React from "react";
import NftCard from "./NftCard";

export default function NftGrid({ nftRecords, onMint }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {
        nftRecords.map(nft => <NftCard nft={ nft } onMint={ onMint } key={ nft.id } />)
      }
    </div>
  );
}
