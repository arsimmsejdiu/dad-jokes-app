import React, { Component } from "react";

import "./Joke.css";

class Joke extends Component {
  getColor () {
    if(this.props.votes >= 15){
      return "#4CAF50";
    } else if(this.props.votes >= 12) {
      return "#8BC34A";
    } else if(this.props.votes >= 9) {
      return "#CDDC39";
    } else if(this.props.votes >= 6) {
      return "#FFEB3B";
    } else if(this.props.votes >= 3) {
      return "#FFC107";
    } else if(this.props.votes >= 0) {
      return "#FF9800";
    } else if(this.props.votes >= -1 ) {
      return "#f44336";
    } else {
      return "darkred"
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (this.props.votes >= 12) {
      return "em em-laughing";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else if(this.props.votes >= -1) {
      return "em em-angry";
    } else {
      return "em em-rage"
    }
  }

  render() {
    const { votes, text, upvote, downvote } = this.props;
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={upvote}></i>
          <span className="Joke-votes" style={{borderColor: this.getColor()}}>{votes}</span>
          <i className="fas fa-arrow-down" onClick={downvote}></i>
        </div>
        <div className="Joke-text">{text}</div>
        <div className="Joke-smiley">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    );
  }
}

export default Joke;
