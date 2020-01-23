import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";

const JustifyRight = styled.div`
  justify-self: right;
`;

const TickerPrice = styled.div`
  ${fontSizeBig};
`;

// adds style to selectable tiles
const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      ${fontSize3}
    `}
`;

// converts number to string and formats coin-price decimal
const numberFormat = number => {
  return +(number + "").slice(0, 7);
};

// pulls data symbol, coin price, and change in price from last 24 hours
function PriceTile({ sym, data }) {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div> {sym} </div>
        <JustifyRight>{numberFormat(data.CHANGEPCT24HOUR)}</JustifyRight>
      </CoinHeaderGridStyled>
      <TickerPrice>${data.PRICE}</TickerPrice>
    </PriceTileStyled>
  );
}

// displays coin-tiles with symbol & price data
export default ({ price, index }) => {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  return <PriceTile sym={sym} data={data}></PriceTile>;
};
