import React from "react";
import { useParams } from "react-router-dom";
import NftCard from "./NftCard";

export default function NftViewer({ nftRecords, onMint }) {
  let { id } = useParams();
  id = parseInt(id);
  const nft = nftRecords.find(iter => iter.id === id);
  if (nft) {
    return (
      <div className="flex justify-center mt-8">
        <div className="w-80">
          <NftCard nft={ nft } onMint={ onMint } />
        </div>
      </div>
    );
  } else {
    return(
      <div className="font-mono text-lg mt-8 text-center">You got the wrong dude!</div>
    );
  }
}
