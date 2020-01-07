import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile, DisabledTile, DeletableTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage"


// pulls CoinName, Symbol, and image from CC
export default function({ coinKey }) {
  return (
    <AppContext.Consumer>
      {({ coinList }) => {
        let coin = coinList[coinKey];

        const TileClass = SelectableTile;

        
        return (
          <TileClass>
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin}/>
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
}
