import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

// used for adding shadow and effects to top-buttons
const ControlButtonHover = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      text-shadow: 0px 0px 60px #03ff03;
    `}
`;

// sets first character to uppercase
function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

// houses the dashboard and settings buttons
function ControlButton({ name, active }) {
  return (
    <AppContext.consumer>
      {({ page }) => (
        <ControlButtonHover active={page === name}>
          {toProperCase(name)}
        </ControlButtonHover>
      )}
    </AppContext.consumer>
  );
}

export default function() {
  return (
    <Bar>
      <Logo> CryptoCurrent </Logo>
      <div />
      <ControlButton active name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
}
