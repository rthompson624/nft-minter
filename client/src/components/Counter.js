import React from "react";

export default function Counter({ nftRecords }) {
  const units = nftRecords.length === 1 ? 'dude' : 'dudes';
  return (
    <div className="font-mono text-right">{ `${nftRecords.length} ${units}` }</div>
  );
}
