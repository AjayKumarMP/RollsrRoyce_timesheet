import React, { Component } from 'react'
import './AccessDenied.css'

export default class AccessDenied extends Component {
    render(){
        return(
            <div className="accessDenied">
                <h2>Looks like your are visting the page too elary/Late
                    <br /> or You are not allowed visit this page
                </h2>
            </div>
        )
    }   
}