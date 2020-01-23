import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import './user.css'

export default class User extends Component {
  constructor(props) {
    super(props)
    const { name, password, user_name, user_type, phone } = this.props && this.props.userEdit
    this.state = {
      name,
      user_name,
      phone,
      password,
      user_type
    }
  }

  adddUser(e) {
    e.preventDefault()
    const { name, user_name, phone, password, user_type } = this.state
    this.props.create({
      name, user_name, phone, password, user_type, id: this.props.userEdit.id
    })
    // console.log(name, user_name, phone, password, user_type)
  }

  render() {
    const { name, user_name, phone, password, user_type } = this.state
    return (
      <div>
        <Form onSubmit={(e) => this.adddUser(e)}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input value={name||''} required type="text" name="name" id="name" placeholder="Enter name"
                  onChange={(e) => this.setState({ name: e.target.value })} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input value={password||''} required type="password" name="password" id="examplePassword" placeholder="Enter Password"
                  onChange={(e) => this.setState({ password: e.target.value })} />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="phone">Phone Number</Label>
                <Input value={phone||''} required type="number" name="phone" id="phone" placeholder="Enter Phone number"
                  onChange={(e) => this.setState({ phone: e.target.value })} />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="userName">User Name</Label>
                <Input value={user_name||''} required type="text" name="userName" id="userName" placeholder="Enter UserName"
                  onChange={(e) => this.setState({ user_name: e.target.value })} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="userType">User Type</Label>
            <Input value={user_type||''} required type="select" name="userType" id="userType" placeholder="Enter UserType"
              onChange={(e) => this.setState({ user_type: e.target.value })}>
              <option value="">Select One</option>
              <option >User</option>
              <option>Admin</option>
              <option>Manager</option>
              <option>Team Lead</option>
            </Input>
          </FormGroup>
          <Button className="create" type="submit" color="primary">{
            this.props.userEdit && this.props.userEdit.id ? 'Update' : 'Create'
          }</Button>
          <Button onClick={() => this.props.close()} className="clear" color="secondary" type="reset">Cancel</Button>
        </Form>
      </div>
    )
  }
}
