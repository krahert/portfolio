import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <Link className="button" to="/login">Log In</Link>
            <a className="button" href="/auth/google">Sign In With Google</a>
          </div>
        );
      default:
        return (
          <div>
            <Link to={`/user/${this.props.auth._id}`} className="user-name situational">
              {this.props.auth.username}
            </Link>
            {/* <Link className="button" to="/my_posts">My Posts</Link> */}
            <a className="button" href="/api/logout">Logout</a>
          </div>
        );
    }
  }
  render() {
    return (
      <header className="header">
        <Link className="logo-container" to="/">
          <img className="logo-img" src="/media/logo.png" alt="" />
        </Link>
        <div className="header-menu-container">
          <ul className="header-menu">
          <span className="separator">[</span>
            <li><Link to="/b/cyb" className="menu-link" title="cyberpunk and cybersecurity">/cyb/</Link></li>
            <li><Link to="/b/tech" className="menu-link" title="science and technology">/tech/</Link></li>
            <li><Link to="/b/code" className="menu-link" title="programming">/code/</Link></li>
            <li><Link to="/b/diy" className="menu-link" title="do it yourself and projects">/diy/</Link></li>
            <span className="separator">]</span>
            <span className="separator">[</span>
            <li><Link to="/b/inter" className="menu-link" title="games and interactive media">/inter/</Link></li>
            <li><Link to="/b/cult" className="menu-link" title="culture">/cult/</Link></li>
            <li><Link to="/b/feels" className="menu-link" title="personal experiences">/feels/</Link></li>
            <li><Link to="/b/hum" className="menu-link" title="humanity">/hum/</Link></li>
            <li><Link to="/b/r" className="menu-link" title="random">/r/</Link></li>
            <span className="separator">]</span>
          </ul>
        </div>
        {this.renderContent()}
      </header>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
