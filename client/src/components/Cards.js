import React, { Component } from "react";
import api from "../utilities/axios";
import Card from "./Card/Card";
import classes from "./Card/Card.module.css";
import AppBar from "./nav/Appbar";
import AddCard from "./Card/AddCard";
import Modal from "./UI/Modal/Modal";
import Save from './UI/Save/Save';


export default class Cards extends Component {
  constructor(props){
    super(props);
    this.state = {
        cards: [],
        soloSet: [],
        soloCollect: [],
        collections: [],
        edit: false,
        modal: false,
        save: false,
        name: 'Select a Collection'
    }
  }
  deleteHandler = this.deleteHandler.bind(this);
 
  componentDidMount() {
    this.cardsAndCollections();
  }
  //Pull All Cards for Selected User
  cardsAndCollections = async () => {
        await api.get("/cards").then((res) => {
        const cards = res.data;
        this.setState({ cards });
      });
          await api.get("/collections").then((res) => {
        const collections = res.data;
        this.setState({ collections });
      });
  }
  //Toggle editing state to delete cards
  editHandler = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ edit: !prevState.edit }));
  };
  //Start a new collection
  newCollection = () => {
    this.setState({cards : []});
    this.setState({soloCollect: []});
    this.setState({soloSet: []});
    this.setState({ name: 'Select a Collection'})
  }
  //Delete individual card from all collections and database
  deleteHandler(index, prevState) {
    api.delete(`/cards/${this.state.cards[index]._id}`);
    const cards = this.state.cards.filter((_, i) => {
      return i !== index;
    });
    this.setState({soloSet: cards});
    this.setState({ cards });
    if(this.state.soloCollect._id && this.state.soloSet.length < 3){
      api.delete(`/collections/${this.state.soloCollect._id}`);
      window.location.reload();
    }
  }
  //Delete collection by Id
  deleteCollection = (id) => {
    api.delete(`/collections/${this.state.soloCollect._id}`);
    window.location.reload();
    }
  //Close modals and reset their forms
  handleClose = () => {
    this.setState({ modal: false });
    this.setState({ save: false});
    document.getElementById("form").reset();
    document.getElementById("save").reset();
  };
  //Add a new card to a user's card database
  submitHandler = (e) => {
    e.preventDefault();
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };
    api.post(`/cards`, card).then((res) => {
    const cards = this.state.cards.concat(res.data);
    this.setState({ cards });
    this.handleClose();
    });
  };
  //Save an array of cards to a collection
  saveCollection = (e) => {
    e.preventDefault();
    const collection = {
      name: this.state.name,
      cards: this.state.cards,
    };
    api.post("/collections", collection).then((res) => {
    const col = this.state.collections.concat(res.data);
    this.setState({ cards: [], collections: col});
    this.setState({ name: 'Select a Collection'})
    this.handleClose();
    });
  };
  //Get a collection by Id
  getCollection = async (id) => {
    await api.get(`/collections/${id}`).then((res) => {
      const collection = res.data.cards;
      const soloCollect = res.data;
      this.setState({cards : collection});
      this.setState({soloCollect});
      this.setState({ soloSet: collection });
      this.setState({ name: soloCollect.name});
      if(!this.state.soloCollect.cards.length) {
        this.deleteCollection();
      }
    });
  };
  //Get form values and setState accordingly
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //Display All Cards and Clear Any Active Collection
  home = () => {
    window.location.reload();
    this.setState({soloSet : []})
    this.setState({soloCollect : []})
    this.setState({ name: 'Select a Collection'});
  }
  //Log User Out
  logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  //Show the Add Card modal component
  showModal = () => {
    this.setState({ modal: true });
  };
  //Show the Save Collection modal component
  showSave = () => {
    this.setState({save: true});
  }

  render() {
    return (
      <>
        <AppBar
          {...this.props}
          edit={this.editHandler}
          newCol={this.newCollection}
          show={this.showSave}
          status={this.state.edit}
          logout={this.logout}
          cards={this.state.cards}
          save={this.saveCollection}
          collection={this.state.collections}
          soloCol={this.state.soloCollect}
          id={this.state.soloCollect._id}
          getCol={this.getCollection}
          home={this.home}
          set={this.state.soloSet}
          name={this.state.name}
          deleteCol={this.deleteCollection}        
        />
          {this.state.cards < 1 && !this.state.soloCollect._id ? (
          <div className={classes.container}>
            <div className={classes.adding}>
            <AddCard show={this.showModal} />
            </div>
            <p className={classes.notice}>
              You have no cards yet! Hit the "Add Card" button start making your
              own flash cards. Save them as a collection to create multiple
              flash card topics!
            </p>
          </div>
            ) :  ( 
            <div className={classes.container}>
            {!this.state.soloCollect._id ? (
                <div className={classes.adding}>
                   <AddCard show={this.showModal} />
                </div>

            ) : null}
            {this.state.cards.map((card, index) => {
                 return (
                   <Card
                   key={index}
                   card={card}
                   question={card.question}
                   answer={card.answer}
                   index={index}
                   edit={this.state.edit}
                   delete={this.deleteHandler}
                  />
                 );
               })}
               {this.state.soloCollect._id  && this.state.edit ?
                <p style={{"position":"absolute", "bottom":"0"}}>
                  Collections will delete with an insufficient number of cards
                </p>
                 : null }
            </div> 
          ) }
          <Modal
            show={this.state.modal}
            submit={this.submitHandler}
            change={this.handleChange}
            hide={this.handleClose}
          />
          <Save
            show={this.state.save}
            save={this.saveCollection}
            change={this.handleChange}
            hide={this.handleClose}
           />
      </>
    );
  }
}
