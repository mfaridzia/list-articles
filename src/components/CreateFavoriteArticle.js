import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirebase } from "../firebase";

const CreateFavoriteArticle = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const generateDate = () => {
    const now = new Date();
    const options = { month: "long", day: "numeric", year: "numeric" };
    return now.toLocaleDateString("en-US", options);
  };
  
  const handleCreateFavoriteArticle = () => {
    const date = generateDate();
    const newArticle = { title, date, link };
    getFirebase()
      .database()
      .ref()
      .child(`articles/${title}`)
      .set(newArticle)
      .then(() => props.history.push('/'));
  }

  return (
    <div className="App">
      <center>
        <Link to="/"> Kembali ke Daftar Artikel </Link>
      </center>
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