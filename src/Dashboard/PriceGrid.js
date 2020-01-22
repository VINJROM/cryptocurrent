import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGrid = styled.div`
  display: grid;
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGrid>
          {prices.map(price => (
            <PriceTile price={price} />
          ))}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
};
