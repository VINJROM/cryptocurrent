import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";
import _ from "lodash";

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

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  console.log(inputValue);
}, 500); // debounce delays invoking function displaying input value

function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value; // targets input value to be captured
  handleFilter(inputValue, coinList, setFilteredCoins)
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
