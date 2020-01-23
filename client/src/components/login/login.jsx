import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications';
import { Button, Form, FormGroup, InputGroupText, Input, Col, InputGroupAddon, InputGroup, Container } from 'reactstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { NotificationContainer } from 'react-notifications'

import './login.css'
import ApiEndPoints from '../../utils/ApiEndPoints'
import HttpClient from '../../utils/httpClient'
export default class Login extends Component {

  email = "@rolls-royce.com"
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      loginBtnText: "Login"
    }
  }

  componentDidMount() {
  }

  submitLogin = async (event) => {
    event.preventDefault();
    this.setState({
      loginBtnText: "Please Wait"
    })
    const { userName, password } = this.state;
    try {
      const response = await HttpClient.ApiCall('post', ApiEndPoints.login,
        { email: `${userName}${this.email}`, password })
      this.state.loginBtnText = "Please Wait";
      this.setState({
        loginBtnText: "Login"
      })
      console.log(response.success)
      if (!response.success)
        return NotificationManager.error('Invalid UserName/Password', "Access Denied", 2000)
      localStorage.setItem('token', response.message.token)
      return this.props.history.push('/employee/dashboard')
    } catch (error) {
      console.log()
      NotificationManager.error('Invalid UserName/Password', "Access Denied", 2000)
      this.setState({
        password: '',
        loginBtnText: "Login"
      });
    }
  }

  render() {
    return (
      <div>
        <NotificationContainer />
        <div className="login">
          <div className="loginContainer">
            <h2 style={{ color: 'orangered' }}>Sign In</h2>
            <Form className="form" onSubmit={(event) => this.submitLogin(event)}>
              <Col>
                <FormGroup>
                  {/* <Label for="Username">User Name</Label> */}
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon={faUser} /></InputGroupAddon>
                    <Input
                      type="text"
                      value={this.state.userName}
                      onChange={(event) => this.setState({ userName: event.target.value })}
                      className="form-control"
                      required="required"
                      name="Username"
                      id="Username"
                      placeholder="Username"
                      autoComplete="username"
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText >{this.email}</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col style={{ marginBottom: "7%" }}>
                <FormGroup>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend"><FontAwesomeIcon icon={faLock} /></InputGroupAddon>
                    {/* <Label for="examplePassword">Password</Label> */}
                    <Input
                      type="password"
                      value={this.state.password}
                      onChange={(event) => this.setState({ password: event.target.value })}
                      name="password"
                      required="required"
                      id="examplePassword"
                      placeholder="password"
                      autoComplete="new-password"
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Button type="submit" color="primary" >{this.state.loginBtnText}</Button>
              <Button type="reset" color="secondary"  ><Link style={{ color: "white" }} to="/">Cancel</Link></Button>
            </Form>
          </div>

        </div>

      </div>
    )
  }
}
