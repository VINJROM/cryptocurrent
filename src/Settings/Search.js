import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";
import _ from "lodash";
import fuzzy from "fuzzy";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;
// debounce delays invoking function displaying input
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  // get all coin symbols
  let coinSymbols = Object.keys(coinList);
  // get all coin names, maps symbol to name
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);
  let allStringsToSearch = coinSymbols.concat(coinNames);
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string); // maps all array values to string-property

  // returns symbol and or coin name
  let filteredCoins = _.pickBy(coinList, (results, symKey) => {
    let coinName = results.CoinName;
    return (
      _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName) // return if fuzzy-results contain symbol or coinName
    );
  });
  console.log(filteredCoins);
  setFilterCoins(filteredCoins);
}, 500);

// targets input value to be captured
function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value;
  handleFilter(inputValue, coinList, setFilteredCoins);
}

// displays search-confirmation and input-field
export default () => {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput
            onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)} // "filterCoins" acts as a helper function that passes an event "e" to pull from all coins and set-coins
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
};
