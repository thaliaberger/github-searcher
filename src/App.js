import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./components/Homepage";
import User from "./components/User";
import Repos from "./components/Repos";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/:username" component={User} />
          <Route exact path="/:username/:repos" component={Repos} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
