import React from "react";
import Filter from "./Filter";
import Search from "./Search";
import NftGrid from "./NftGrid";
import Counter from "./Counter";

export default function CollectionBrowser({ filter, setFilter, setSearchText, viewableNftRecords, onMint }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <Filter filter={ filter } setFilter={ setFilter } />
      <div className="border-l-2 w-full p-4">
        <div className="flex flex-row justify-between">
          <Search setSearchText={ setSearchText } />
          <Counter nftRecords={ viewableNftRecords } />
        </div>
        <NftGrid nftRecords={ viewableNftRecords } onMint={ onMint } />
      </div>
    </div>
  );
}
