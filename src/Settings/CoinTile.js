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
export default function({ coinKey, topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, addCoin, removeCoin }) => {
        let coin = coinList[coinKey];

        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        }

        return (
          <TileClass
            conClick={clickCoinHandler(
              topSection,
              coinKey,
              addCoin,
              removeCoin
            )}
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
