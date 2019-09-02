import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { getFirebase } from "../firebase";

 function ListArticleFinished(props) {
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
        if(snapshotVal[data].status === "done") {
          favoriteArticle.push(snapshotVal[data]);
        }
      } 
      const newestFirst = favoriteArticle.reverse();
      setArticles(newestFirst);
    })
  }, [articles])

  const removeFavoriteArticle = (title) => {
    getFirebase()
      .database()
      .ref('articles/' + title)
      .remove()
      .then(() => props.history.push('/artikel-selesai-dibaca'));
  }

  return (
    <>
      <center>
        <Link className="link" to="/"> Halaman Utama </Link> 
        <Link className="link" to="/buat-artikel-favorit"> Buat Artikel Favorit Kalian </Link>
      </center>
      {articles.map((article, index) => (
        <div className="articles" key={index}>
          <p> 
            <a href={article.link}> { article.title } </a> 
            <button className="btn-remove" onClick={() => removeFavoriteArticle(article.title)}> 
              &times; 
            </button>
          </p>
        </div>
      ))} 
    </>
  );
}

export default ListArticleFinished;
