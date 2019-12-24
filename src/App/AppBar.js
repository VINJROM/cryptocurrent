import React from "react";
import styled, { css } from "styled-components";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  grid-template-columns: 180px auto 100px 100px;
`;

const ControlButtonHover = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: blue;
      text-shadow: 0px 0px 60px #03ff0;
    `}
`;

function ControlButton({ name, active }) {
  return <ControlButtonHover active={active}>{name}</ControlButtonHover>;
}

export default function() {
  return (
    <Bar>
      <Logo> CryptoCurrent </Logo>
      <div />
      <ControlButton name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
}
