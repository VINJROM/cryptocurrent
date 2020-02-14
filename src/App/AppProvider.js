import React from "react";
import _ from "lodash";
import moment from "moment";
const cc = require("cryptocompare");

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

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
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins
    };
  }

  // pulls coins from Crypto-Compare
  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  // pulls coin-list data
  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
    console.log(coinList);
  };

  // pulls coin-prices of favorites from CC
  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({ prices });
  };

  // fetches historical currency data
  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    console.log("results", results);
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ months: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  // returns promise array of coin prices
  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
      } catch (e) {
        console.warn("Fetch price error: ", e);
      }
    }
    return returnData;
  };

  // filters out price objects that have no keys
  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    // We must filter the empty price objects
    prices = prices.filter(price => Object.keys(price).length);
    this.setState({ prices });
  };

  // displays cc price over 10 decrements of time
  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ months: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
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

  // defaults first visit to "settings" page; fetches favorites prices; sets favorite items to localStorage
  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite // creates key value pair of currentFavorites
      },
      () => {
        this.fetchPrices();
      }
    );
    localStorage.setItem(
      "cryptoCurrent",
      JSON.stringify({
        favorites: this.state.favorites, // sets favorites to local storage
        currentFavorite
      })
    );
  };

  // merges parsed currentFavorites string to local storage; sets state of local storage to contain current favorites
  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoCurrent",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoCurrent")),
        currentFavorite: sym
      })
    );
  };

  // sets page value based on localStorage data
  setSettings() {
    let cryptoCurrentData = JSON.parse(localStorage.getItem("cryptoCurrent")); // gets data from localStorage
    if (!cryptoCurrentData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorite } = cryptoCurrentData;
    return { favorites, currentFavorite };
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
