import React from "react";

export default function ViewableCount({ nftRecords }) {
  const units = nftRecords.length === 1 ? 'item' : 'items';
  return (
    <div className="font-mono">{ `${nftRecords.length} ${units}` }</div>
  );
}
