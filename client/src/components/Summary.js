import React from "react";

export default function Summary(props) {
  return (
    <div className="h-44 border-b-2 text-center pt-4">
      <div>[ Collection Stats & Description ]</div>
      <div className="pt-5">
        <div className="text-2xl font-mono font-bold">Let's Roll!</div>
        <button className="p-2 bg-blue-600 rounded-lg font-mono font-bold text-white mt-5 hover:bg-cyan-500" onClick={ props.onMint }>Mint NFT</button>
      </div>
    </div>
  );
}
