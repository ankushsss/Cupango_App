import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import {ItemContext , ItemContextProvider} from "./context/ItemContext"
import { useContext } from 'react';
import store from './components/ReduxComponent/store'
import {Provider} from 'react-redux'
store.subscribe(()=> console.log(store.getState()));

ReactDOM.render(
  <LayoutProvider>
      <UserProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <ItemContextProvider>
            <Provider store={store}> 
              <App />
            </Provider>
          </ItemContextProvider>
        </ThemeProvider>
      </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
