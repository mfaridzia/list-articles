import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getFirebase } from "../firebase";

 function ListFavoriteArticle(props) {
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
        if(snapshotVal[data].status === "undone") {
          favoriteArticle.push(snapshotVal[data]);
        }
      } 
      const newestFirst = favoriteArticle.reverse();
      setArticles(newestFirst);
    })
  }, [articles])

  const updateStatus = (title) => {
      getFirebase()
        .database()
        .ref('articles/' + title)
        .update({status: "done"})
  }

  const removeFavoriteArticle = (title) => {
    getFirebase()
      .database()
      .ref('articles/' + title)
      .remove()
      .then(() => props.history.push('/'));
  }

  return (
    <>
      <center>
        <Link className="link" to="/buat-artikel-favorit"> Buat Artikel Favorit</Link> 
        <Link className="link" to="/artikel-selesai-dibaca"> Artikel yang Sudah Dibaca </Link>
      </center>
      {articles.map((article, index) => (
        <div className="articles" key={index}>
          <p> 
            <a href={article.link}> { article.title } </a>
            <button className="btn-remove" onClick={() => removeFavoriteArticle(article.title)}> 
              &times; 
            </button>
            <button className="btn-done" onClick={() => updateStatus(article.title)}> 
              Done 
            </button>
          </p>
        </div>
      ))} 
    </>
  );
}

export default ListFavoriteArticle;
