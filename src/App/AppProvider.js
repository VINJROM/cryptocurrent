import React from "react";
import _ from "lodash";

const cc = require("cryptocompare");

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

// sets up favorites-provider to be used by consumer
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["APEX", "BTC", "CACH", "DOGE"],
      ...this.setSettings(), // function sets page to "setting"
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins
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

  // adds coin key to favorites
  addCoin = key => {
    let favorites = [...this.state.favorites]; // take contents of array and updates with new key
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  // removes coin key from favorites
  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) }); // "pulls" selected coin and updates array
  };

  // takes in array and asks if key is in favorites
  isInFavorites = key => _.includes(this.state.favorites, key);

  // sets favorite items to localStorage
  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoCurrent",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  // sets page value based on localStorage data
  setSettings() {
    let cryptoCurrentData = JSON.parse(localStorage.getItem("cryptoCurrent")); // gets data from localStorage
    if (!cryptoCurrentData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites } = cryptoCurrentData;
    return { favorites };
  }

  // function sets page on app
  setPage = page => this.setState({ page });

  // sets filteredCoin
  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  render() {
    return (
      // passes children through to provider
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
