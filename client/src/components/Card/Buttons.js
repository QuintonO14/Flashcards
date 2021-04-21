import React from "react";
import classes from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Buttons({ edit, click, deleted, flipped, i}) {
  return (
  <>
    <div className={classes.buttons}>
      {!edit ? (
        <button onClick={click} id="myButton" className={classes.flipButton}>
          {!flipped ? (<h3>Reveal Answer</h3> ) : (<h3>Back to Question</h3>)}
        </button>
      ) : (
        <button className={classes.trash} onClick={() => deleted(i)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  </>
  );
}
