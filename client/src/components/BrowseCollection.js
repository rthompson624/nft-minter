import React from "react";
import Filter from "./Filter";
import SearchEntry from "./SearchEntry";
import ListNfts from "./ListNfts";
import ViewableCount from "./ViewableCount";

export default function BrowseCollection({ filter, setFilter, setSearchText, viewableNftRecords, onMint }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <Filter filter={ filter } setFilter={ setFilter } />
      <div className="border-l-2 w-full p-4">
        <div className="flex flex-row justify-between">
          <SearchEntry setSearchText={ setSearchText } />
          <ViewableCount nftRecords={ viewableNftRecords } />
        </div>
        <ListNfts nftRecords={ viewableNftRecords } onMint={ onMint } />
      </div>
    </div>
  );
}
