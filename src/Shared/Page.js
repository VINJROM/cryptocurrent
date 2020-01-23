import React from 'react';
import {AppContext} from "../App/AppProvider";

// sets Page to selected button
export default function ({name, children}) {
  return <AppContext.Consumer>
    {({page}) => { 
      // if page is not selected, return children
      if (page !== name) {
        return null;
      }
      return <div> {children} </div>;
    }}
  </AppContext.Consumer>;
}
