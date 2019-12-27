import React, { Component } from "react";
import "./App.css";
import WelcomeMessage from "../Settings/WelcomeMessage";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import { AppProvider } from "./AppProvider"; // wrapping import in {brackets} pulls "name" from object-export in targeted file


class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <WelcomeMessage />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
