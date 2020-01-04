import React from "react";

export default function({ coin, style }) {
  return (
    <img
      alt={coin.CoinSymbol}
      style={style || { height: "50px" }} // if no style, default to height of 50px
      src={`http://cryptocompare.com/${coin.ImageUrl}`} // source image from cc
    />
  );
}
