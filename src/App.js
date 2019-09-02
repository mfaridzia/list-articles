import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateFavoriteArticle from "./components/CreateFavoriteArticle";
import ListFavoriteArticle from "./components/ListFavoriteArticle";
import ListArticleFinished from "./components/ListArticleFinsihed";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1> Artikel favorit yang bisa kalian baca </h1>
      </div>
      <Switch>
        <Route exact path="/" component={ListFavoriteArticle} />
        <Route path="/buat-artikel-favorit" component={CreateFavoriteArticle} />
        <Route path="/artikel-selesai-dibaca" component={ListArticleFinished} />
      </Switch>
    </Router>
  );
}

export default App;
