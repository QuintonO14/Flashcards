import React, { Component } from "react";
import classes from "./Card.module.css";
import Buttons from "./Buttons";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
    if(this.isFlipped !== false) {
      setTimeout(function() {
        this.setState({ isFlipped: false });
    }
    .bind(this),
    2000);
    }
  }

  checkHandler(e) {
    this.setState((prevState) => ({ isChecked: !prevState.isChecked }));
  }

  render() {
    return (
      <div id="myCard" className={classes.card}>
        {!this.state.isFlipped ? (
          <p className={classes.cardText}>{this.props.question}</p>
        ) : (
          <p className={classes.cardText}>{this.props.answer}</p>
        )}
        <Buttons
          i={this.props.index}
          id={this.props.id}
          click={this.handleClick}
          deleted={this.props.delete}
          edit={this.props.edit}
          flipped={this.state.isFlipped}
          checked={this.props.checked}
        />
      </div>
    );
  }
}

export default Card;
