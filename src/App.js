import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

import Home from './pages/Home'
import ViewContact from './pages/ViewContact';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/Add">
                    <AddContact />
                </Route>
                <Route exact path="/Edit/:id">
                    <EditContact />
                </Route>
                <Route exact path="/View/:id">
                    <ViewContact />
                </Route>
            </Switch>

        </Router>
  );
}

export default App;
