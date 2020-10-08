import React from "react";
import logo from "../themoviedb_logo.png";
import "../App.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
    };
  }
  resizeHandler = () => {
    this.setState({
      isMobile: window.innerWidth < 1200,
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler(), false);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="header-logo" alt="logo" />
          <p className="header-title">Movies</p>
          {this.state.isMobile ? (
            <button className="header-button-mobile">
              <i className="arrow down"></i>
            </button>
          ) : (
            <button className="header-button">
              My Account <i className="arrow down"></i>
            </button>
          )}
        </header>
      </div>
    );
  }
}
