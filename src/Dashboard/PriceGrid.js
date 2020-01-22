import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

const PriceGrid = styled.div`
    display: grid;
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ prices }) => (
        <PriceGrid>
          {prices.map(price => <div>Price</div>)}
        </PriceGrid>
      )}
    </AppContext.Consumer>
  );
};
