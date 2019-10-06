import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getFirebase } from "../firebase";
import Menu from './Menu';

const CreateFavoriteArticle = (props: RouteComponentProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const generateDate = () => {
    const now: Date = new Date();
    const options: {} = { month: "long", day: "numeric", year: "numeric" };
    return now.toLocaleDateString("en-US", options);
  };
  
  const handleCreateFavoriteArticle = () => {
    const date = generateDate();
    const status: string = "undone";
    const newFavoriteArticle = { title, date, link, status };
    getFirebase()
      .database()
      .ref()
      .child(`articles/${title}`)
      .set(newFavoriteArticle)
      .then(() => props.history.push('/'));
  }

  return (
    <div className="App">
      <Menu>
        <Link className="link" to="/"> Halaman Utama </Link> 
        <Link className="link" to="/artikel-selesai-dibaca"> Artikel yang Sudah Dibaca </Link>
      </Menu>
      <div className="favorite-article">
        <label htmlFor="title"> Title </label>
        <input 
          type="text" 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <label htmlFor="link"> Link </label>
        <input 
          type="text" 
          name="link" 
          value={link} 
          onChange={(e) => setLink(e.target.value)} 
        />
        <button onClick={handleCreateFavoriteArticle}> Create! </button>
      </div>
    </div>
  );
};

export default CreateFavoriteArticle;