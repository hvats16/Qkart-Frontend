import Register from "./components/Register";
import Products from "./components/Products";
import Login from "./components/Login";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";
export const config = {
  endpoint: `https://qkart-frontend-vc4k.onrender.com/api/v1`,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route exact path={`/`}>
            <Products />
          </Route>
          <Route exact path={`/register`}>
            <Register />
          </Route>
          <Route exact path={`/login`}>
            <Login />
          </Route>
          <Route exact path={`/checkout`}>
            <Checkout />
          </Route>
          <Route path="/thanks">
              <Thanks />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
