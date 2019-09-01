import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateFavoriteArticle from "./components/CreateFavoriteArticle";
import ListFavoriteArticle from "./components/ListFavoriteArticle";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1> Artikel favorit yang bisa kalian baca </h1>
      </div>
      <Switch>
       <Route exact path="/" component={ListFavoriteArticle} />
        <Route path="/create-favorite-article" component={CreateFavoriteArticle} />
      </Switch>
    </Router>
  );
}

export default App;
