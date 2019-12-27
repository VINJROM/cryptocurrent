import React from "react";

export const AppContext = React.createContext();

// setting up main Consumer to be used by Provider
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.setSettings(), // function sets page to "setting"
      setPage: this.setPage
    };
  }

  confirmFavorites() {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    // sets favorite items in localStorage
    localStorage.setItem(
      "cryptoCurrent",
      JSON.stringify({
        test: "hello"
      })
    );
  }

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
      <AppContext.Provider value={this.state}>
        {/* passes children though to provider */}
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
