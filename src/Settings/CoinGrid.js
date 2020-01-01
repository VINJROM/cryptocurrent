import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "../App/AppProvider";

export const CoinGridStyled = styled.div`
  display: grid;
`;
export default function() {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyled>{Object.keys(coinList).length}</CoinGridStyled>
      )}
    </AppContext.Consumer>
  );
}
