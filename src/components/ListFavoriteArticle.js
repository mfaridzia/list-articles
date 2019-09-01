import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getFirebase } from "../firebase";

 function ListFavoriteArticle() {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getFirebase()
    .database()
    .ref("/articles")
    .orderByChild("date")
    .once("value")
    .then(snapshot => {
      let favoriteArticle = [];
      const snapshotVal = snapshot.val();
      for(let data in snapshotVal) {
        favoriteArticle.push(snapshotVal[data]);
      }
      const newestFirst = favoriteArticle.reverse();
      setArticles(newestFirst);
    })
  }, [])

  return (
    <>
      <center>
        <Link to="/create-favorite-article"> Buat Artikel Favorit Kalian </Link>
      </center>
      {articles.map((article, index) => (
        <div className="articles" key={index}>
          <p> <a href={article.link}> { article.title } </a> </p>
        </div>
      ))} 
    </>
  );
}

export default ListFavoriteArticle;
