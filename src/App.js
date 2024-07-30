import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";

import { HomePage } from "./view/pages";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#444",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#084",
    },
    warning: {
      main: "#f80",
    },
    error: {
      main: "#800",
    },
  },
  typography: {
    fontFamily: "Afacad",
    fontSize: 12,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
