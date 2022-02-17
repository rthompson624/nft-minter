import React from "react";

export default function ViewableCount({ nftRecords }) {
  return (
    <div className="font-mono">{nftRecords.length} items</div>
  );
}
