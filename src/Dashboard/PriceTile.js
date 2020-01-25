import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
  justify-self: right;
`;
const JustifyLeft = styled.div`
  justify-self: left;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

const ChangePct = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`;

// adds style to selectable tiles
const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}

  ${props =>
    props.currentFavorite &&
    css`
      ${greenBoxShadow}
      pointer-events:none;
    `}
`;

// converts number to string and formats coin-price decimal
const numberFormat = number => {
  return +(number + "").slice(0, 7);
};

// displays percent change; set color to red if < 0
function ChangePercent({ data }) {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePct>
    </JustifyRight>
  );
}

// pulls data symbol, coin price, and change in price from last 24 hours
function PriceTile({ sym, data, currentFavorite, setCurrentFavorite }) {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorite}
      currentFavorite={currentFavorite}
    >
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${data.PRICE}</TickerPrice>
    </PriceTileStyled>
  );
}

// displayed compact version of PriceTile
function PriceTileCompact({ sym, data, currentFavorite, setCurrentFavorite }) {
  return (
    <PriceTileStyled
      onClick={setCurrentFavorite}
      compact
      currentFavorite={currentFavorite}
    >
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercent data={data} />
      <div>${numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
}

// displays coin-tiles with symbol & price data
export default ({ price, index }) => {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTile : PriceTileCompact; // if below top row, display compact price tile
  return (
    <AppContext.Consumer>
      {({ currentFavorite, setCurrentFavorite }) => (
        <TileClass
          sym={sym}
          data={data}
          currentFavorite={currentFavorite === sym} // sets first favorite to currentFavorite
          setCurrentFavorite={() => setCurrentFavorite(sym)}
        ></TileClass>
      )}
    </AppContext.Consumer>
  );
};
