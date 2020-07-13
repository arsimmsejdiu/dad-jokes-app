import React, { Component } from "react";
import axios from "axios";
import uuid from "uuid/dist/v4";

import "./JokeList.css";
import Joke from "./Joke.component";

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false,
    };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  getJokes = async () => {
    try {
      // Load Jokes
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let newJoke = response.data.joke;
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE !!");
          console.log(newJoke);
        }
      }
      this.setState(
        (state) => ({
          loading: false,
          jokes: [...state.jokes, ...jokes],
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (err) {
      alert(err);
      this.setState({loading: false})
    }
  };

  handleVote = (id, delta) => {
    this.setState(
      (state) => ({
        jokes: state.jokes.map((joke) =>
          joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
        ),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  };

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
  };

  handleClear = () => {
    window.localStorage.clear();
  };

  render() {
    if (this.state.loading) {
      return (
        <div className="JokeList-spinner">
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1 className="JokeList-title">Loading ... </h1>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes)
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="hahaha"
          />
          <button className="JokeList-getmore" onClick={this.handleClick}>
            Fetch Jokes
          </button>
          <button className="JokeList-getmore" onClick={this.handleClear}>
            Clear Strg.
          </button>
        </div>
        <div className="JokeList-jokes">
          {jokes.map((joke) => (
            <Joke
              key={joke.id}
              votes={joke.votes}
              text={joke.text}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JokeList;
