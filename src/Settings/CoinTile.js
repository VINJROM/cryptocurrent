import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile, DisabledTile, DeletableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

// click handler that removes : adds coins when clicked
function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection
    ? () => {
        removeCoin(coinKey);
      }
    : () => {
        addCoin(coinKey);
      };
}

// pulls CoinName, Symbol, and image from CC through coinKey
export default function({ coinKey, topSection, isInFavorites }) {
  return (
    <AppContext.Consumer>
      {({ coinList, addCoin, removeCoin, isInFavorites }) => {
        let coin = coinList[coinKey];

        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        } else if (isInFavorites(coinKey)) { // if coin is in favorites, show as DisabledTile
          TileClass = DisabledTile;
        }

        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
          >
            <CoinHeaderGrid
              topSection={topSection}
              name={coin.CoinName}
              symbol={coin.Symbol}
            />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
}
