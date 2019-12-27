import React from "react";

export const AppContext = React.createContext();

// setting up main Consumer to be used by Provider
export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      setPage: this.setPage
    };
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
