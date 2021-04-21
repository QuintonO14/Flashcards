import React from "react";
import classes from "./Modal.module.css";
import cx from "classnames";
import { Component } from "react";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }

  render() {
    classes.block = this.props.show;
    return (
      <div className={cx(classes.modal, { [classes.none]: !this.props.show })}>
        <h1>New card</h1>
        <form id="form" onSubmit={this.props.submit} autoComplete="off" className={classes.main}>
          <input
            type="text"
            onChange={this.props.change}
            name="question"
            required
            maxLength="100"
            placeholder="Write a question or hint"
          />
          <input
            type="text"
            name="answer"
            onChange={this.props.change}
            required
            maxLength="100"
            placeholder="Answer goes here"
          />
          <div>
            <button type="submit">Add</button>
            <button type="button" onClick={this.props.hide}>
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Modal;
