import React, { Component } from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'
import { Link } from 'react-router-dom'

import './header.css'

export default class Header extends Component {
    render() {
        return (
            <div >
                <Navbar color="info" light expand="md">
                    <NavbarBrand><Link style={{color: 'black', textDecoration: 'none'}} to="/employee/dashboard"><h3>Employee Timesheet</h3></Link></NavbarBrand>
                </Navbar>  
            </div>
        )
    }
}
