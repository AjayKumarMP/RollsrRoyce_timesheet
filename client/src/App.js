import React, { Component } from 'react';
import { Button, Spinner, Table, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

import User from './components/user/user'
import './App.css'

class App extends Component {
  state = {
    employees: [],
    filteredData: [],
    loader: true,
    userForm: false,
    userEdit: '',
  }

  componentDidMount() {
    this.getAll()
  }

  // method to add create user
  async addUser({ name, phone, password, user_name, user_type, id }) {
    this.setState({
      loader: true
    })
    this.getAll()
    this.setState({
      userForm: false
    })
  }

  //Method fetches all user data from firebase
  async getAll() {
    
  }

  // method which will delete the data as per the ID
  async remove(id) {
    if (!id) return
    this.setState({ loader: true })
    await this.getAll()

  }

  //Method which filters the data based on input search string
  filterData(search) {
    this.setState({
      filteredData:
        this.state.employees.filter(emp => emp[1].name.toLowerCase().indexOf(search.toLowerCase()) > -1)
    })
  }

  render() {
    const { filteredData, loader, userForm } = this.state;
    return (

      <div className="App">
        <Spinner hidden={!loader} className="spinner" color="primary" />
        <div className="row">
          <Input onChange={(e) => this.filterData(e.target.value)} type="search " className="col-md-3 seachBox" placeholder="serach..." />
          <div className="col-md-7"></div>
          <Button  className="col-md-1" onClick={() => this.props.history.push('/employee/timesheet')} color="primary">+ TimeSheet</Button>

        </div>
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <td>Date</td>
              <td>hours</td>
              <td>Project</td>
              <td>Activity</td>
              <td>Submitted date</td>
            </tr>
          </thead>
          <tbody>
            {
              filteredData.map((employee, index) =>
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{employee[1].name}</td>
                  <td>{employee[1].phone}</td>
                  <td>{employee[1].user_name}</td>
                  <td>{employee[1].user_type}</td>
                  <td>
                    <span className="actions" onClick={() => this.remove(employee[0])} id="deleteTooltip" aria-hidden>&#x1f5d1;</span>
                    <span className="actions" onClick={() => this.setState({ userEdit: employee[1], userForm: true })} id="editTooltip" role="img" aria-label="" aria-hidden>&#x270D;</span>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <div hidden={filteredData.length > 0 || loader}>
          <span>No Data Found</span></div>
        <Modal isOpen={userForm} onClosed={() => this.setState({ userForm: false })}>
          <ModalHeader >Create User</ModalHeader>
          <ModalBody>
            <User
              userEdit={this.state.userEdit}
              create={(user) => this.addUser(user)}
              close={() => this.setState({ userForm: false })}>
            </User>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default App;
