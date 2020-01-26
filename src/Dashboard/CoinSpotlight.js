import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";

export default () => {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => (
        <Tile>
          <h2>{coinList[currentFavorite].CoinName}</h2>
          <CoinImage coin={coinList[currentFavorite]} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
};
