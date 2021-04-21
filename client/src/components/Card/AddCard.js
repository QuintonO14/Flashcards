import React from "react";
import classes from "./Card.module.css";

const addCard = (props) => {
  return (
    <>
      <button className={classes.add} type="button" onClick={props.show}>
        Add Card
      </button>
    </>
  );
};

export default addCard;
