import React from "react";
import classes from "./Appbar.module.css";


const AppBar = ({edit, show, name, newCol, id, status, home, cards, collection, soloCol, set, logout, getCol, deleteCol }) => {
  

  return (
    <div className={classes.root}>
      {collection.length ? (
          <select
          name="collections"
          onChange={(e) => getCol(e.target.value)}
          value={name}
          >
            <option defaultValue hidden>{name}</option>
            {collection.map((collection, index) => {
            return (
            <option key={index} defaultValue={name} value={collection._id}>
            {collection.name}
            </option>
            );
            })}
          </select>
      ) : <p style={{"padding": '1%'}}>A Collection Is Just 3 Cards Away!</p> } 
      {soloCol._id ? 
      <button onClick={() => deleteCol(id)}>Delete {soloCol.name}</button>
       : null }
      {cards.length >= 3 && set < 1  ?   (
        <button onClick={show}>Save</button>
      ) : null }
      {soloCol._id || cards.length > 1 ? <button onClick={newCol}>New</button> : null }
       <button onClick={home}> All</button>
        {cards.length > 0 ? (  
      <button onClick={edit}>
        {!status ? <p>Edit</p> : <p>Play</p>}
      </button>
      ) : null } 
        <button onClick={logout}>Logout</button>     
    </div>
  );
};

export default AppBar;
