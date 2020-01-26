import React from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";

const SpotLightName = styled.h2`
  text-align: center;
`;

// displays stylized coin symbol and image
export default () => {
  return (
    <AppContext.Consumer>
      {({ currentFavorite, coinList }) => (
        <Tile>
          <SpotLightName>{coinList[currentFavorite].CoinName}</SpotLightName>
          <CoinImage spotlight coin={coinList[currentFavorite]} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
};
