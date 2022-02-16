import React from "react";
import NftCard from "./NftCard";

export default function ListNfts({ nftRecords, onMint }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {
        nftRecords.map(nft => <NftCard nft={ nft } onMint={ onMint } key={ nft.id } />)
      }
    </div>
  );
}
