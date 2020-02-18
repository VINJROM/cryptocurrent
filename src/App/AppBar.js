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
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

// sets first character to uppercase
function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

// houses the dashboard and settings buttons
function ControlButton({ name }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit, page, setPage }) => (
        <ControlButtonHover
          active={page === name}
          onClick={() => setPage(name)} // sets name to state
          hidden ={firstVisit && page === 'dashboard'}
        >
          {toProperCase(name)}
        </ControlButtonHover>
      )}
    </AppContext.Consumer>
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
