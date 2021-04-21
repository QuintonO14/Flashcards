import React from 'react';
import classes from "./Save.module.css";
import cx from "classnames";

const Save = ({show, save, hide, change}) => {
    return (
        <div className={cx(classes.modal, { [classes.none]: !show })}>
        <h1>Give Your Collection A Name!</h1>
        <form id="save" onSubmit={save} autoComplete="off" className={classes.main}>
          <input
          type="text"
          name="name"
          onChange={change}
          required
          maxLength="10"
          placeholder="Keep collection names to 10 characters or less"
           />
           <div>
             <button type="submit">Save</button>
             <button type="button" onClick={hide}>
              Close
            </button>
           </div>
        </form>
    </div>
    );
}


export default Save;