import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
    <div className="menu-big-container">
      <ul className="menu-list">
        <li className="link-container">
          <Link to="/b/cyb" className="board-link">/cyb/ - cyberpunk and cybersecurity</Link>
        </li>
        <li className="link-container">
          <Link to="/b/tech" className="board-link">/tech/ - science and technology</Link>
        </li>
        <li className="link-container">
          <Link to="/b/code" className="board-link">/code/ - programming</Link>
        </li>
        <li className="link-container">
          <Link to="/b/diy" className="board-link">/diy/ - do it yourself and projects</Link>
        </li>
        <li className="link-container">
          <Link to="/b/inter" className="board-link">/inter/ - games and interactive media</Link>
        </li>
        <li className="link-container">
          <Link to="/b/cult" className="board-link">/cult/ - culture</Link>
        </li>
        <li className="link-container">
          <Link to="/b/feels" className="board-link">/feels/ - personal experiences</Link>
        </li>
        <li className="link-container">
          <Link to="/b/hum" className="board-link">/hum/ - humanity</Link>
          </li>
        <li className="link-container">
          <Link to="/b/r" className="board-link">/r/ - random</Link>
        </li>
      </ul>
    </div>
    );
  }
}

export default Landing;