import React from "react";
import {AppContext} from "../App/AppProvider";

export default function ({firstVisit}) {
  return (
    <AppContext.Consumer>
      {({firstVisit}) =>
      firstVisit ? <div>
        Welcome to CryptoCurrent, please select your favorite crypto-currencies to begin. {' '}
      </div> : null
      }
    </AppContext.Consumer>
  )
}
