import React, { Component } from 'react'
import { Navbar } from 'reactstrap'
import './footer.css';

export default class footer extends Component {
  render() {
    return (
      <div className="footer">
        <Navbar color="info" light expand="md">
          <span className="footerText">@Copy rights {new Date().getFullYear()}</span>
        </Navbar>
      </div>
    )
  }
}
