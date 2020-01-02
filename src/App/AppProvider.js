import React from "react";

const cc = require("cryptocompare");

export const AppContext = React.createContext();

// sets up favorites-provider to be used by consumer
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.setSettings(), // function sets page to "setting"
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites
    };
  }

  // pulls coins from CC
  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
    console.log(coinList);
  };

  // sets favorite items to localStorage
  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoCurrent",
      JSON.stringify({
        test: "hello"
      })
    );
  };

  setSettings() {
    let cryptoCurrentData = JSON.parse(localStorage.getItem("cryptoCurrent")); // gets data from localStorage
    if (!cryptoCurrentData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }

  // function sets page on app
  setPage = page => this.setState({ page });

  render() {
    return (
      // passes children through to provider
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
