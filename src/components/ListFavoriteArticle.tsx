import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps } from 'react-router-dom';
import { getFirebase } from "../firebase";
import Menu from './Menu';
import { DataSnapshot } from './types';

function ListFavoriteArticle (props: RouteComponentProps) {
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
        if(snapshotVal[data].status === "undone") {
          favoriteArticle.push(snapshotVal[data]);
        }
      } 
      const newestFirst: any = favoriteArticle.reverse();
      setArticles(newestFirst);
    })
  }, [])

  const updateStatus = (title: string) => {
    getFirebase()
      .database()
      .ref('articles/' + title)
      .update({status: "done"})
      .then(() => props.history.push('/'));
  }

  const removeFavoriteArticle = (title: string) => {
    getFirebase()
      .database()
      .ref('articles/' + title)
      .remove()
      .then(() => props.history.push('/'));
  }

  return (
    <>
      <Menu>
        <Link className="link" to="/buat-artikel-favorit"> Buat Artikel Favorit</Link> 
        <Link className="link" to="/artikel-selesai-dibaca"> Artikel yang Sudah Dibaca </Link>
      </Menu>
      {articles.map((article: DataSnapshot, index) => (
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
