import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from 'react-router-dom';
import { getFirebase } from "../firebase";
import Menu from './Menu';
import { DataSnapshot } from './types';

 function ListArticleFinished(props: RouteComponentProps) {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getFirebase()
    .database()
    .ref("/articles")
    .orderByChild("date")
    .once("value")
    .then((snapshot: DataSnapshot) => {
      let favoriteArticle: string[] = [];
      const snapshotVal = snapshot.val();
      for(let data in snapshotVal) {
        if(snapshotVal[data].status === "done") {
          favoriteArticle.push(snapshotVal[data]);
        }
      } 
      const newestFirst: any = favoriteArticle.reverse();
      setArticles(newestFirst);
    })
  }, [])

  const removeFavoriteArticle = (title: string) => {
    getFirebase()
      .database()
      .ref('articles/' + title)
      .remove()
      .then(() => props.history.push('/artikel-selesai-dibaca'));
  }

  return (
    <>
      <Menu>
        <Link className="link" to="/"> Halaman Utama </Link> 
        <Link className="link" to="/buat-artikel-favorit"> Buat Artikel Favorit Kalian </Link>
      </Menu>
      {articles.map((article: DataSnapshot, index) => (
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
