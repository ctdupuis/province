import React, { Component } from "react";
import "../../stylesheets/sessions/dashboard.css";
import Loading from '../static/Loading';
import { FaPen } from 'react-icons/fa';
import ContactList from "./ContactList";
import NewUser from "./NewUser";
import DeleteUser from "./DeleteUser";
import EmployeeSchedule from "./EmployeeSchedule";
import ContactInfo from "./ContactInfo";

export default class Dashboard extends Component {
  componentDidMount() {
    this.props.getContacts();
    this.props.getSchedule();
  }

  state = {
    toggleEmailInput: false,
    togglePhoneInput: false,
    email: '',
    phone: '',
    username: this.props.currentUser.username
  }

  renderAdminBadge(currentUser) {
    return currentUser.admin ? <div className="admin-badge">Admin</div> : null
  }

  adminCheck(currentUser) {
    return currentUser.admin
  }

  handleChange = ({ target: { value, name } })=> {
    if (name === "phone") {
      this.setState(prevState => ({ phone: this.numberFormat(value, prevState.phone) }))
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  numberFormat = (value, previousValue) => {
    if (!value) return value;
    
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)} ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  }

  handleClick = event => {
    this.props.updateInfo(this.state, this.props.history)
  }

  toggleEmailInput = () => {
    this.setState({
      toggleEmailInput: !this.state.toggleEmailInput,
      email: '',
    })
  }

  togglePhoneInput = () => {
    this.setState({
      togglePhoneInput: !this.state.togglePhoneInput,
      phone: '',
    })
  }

  renderEmail = (currentUser) => {
    if (currentUser.email) {
      return currentUser.email
    } else {
      return "No email on file"
    }
  }

  renderPhone = (currentUser) => {
    if (currentUser.phone) {
      return currentUser.phone
    } else {
      return "No phone number on file"
    }
  }

  render() {
    const { currentUser, contacts, schedule, loading } = this.props
    return (
      loading ? <Loading /> :
      <section className="dash-container">
        <div className="dash-content">
            <div className="user-info-title">
              <h2 style={{ fontSize: "2em" }}>Welcome, {currentUser.first_name} {currentUser.last_name} | {currentUser.username} </h2>
              {this.renderAdminBadge(currentUser)}
            </div>

            <ContactInfo 
              toggleEmail={this.toggleEmailInput}
              toggleEmailVal={this.state.toggleEmailInput}
              email={this.state.email}
              togglePhone={this.togglePhoneInput}
              togglePhoneVal={this.state.togglePhoneInput}
              phone={this.state.phone}
              handleChange={this.handleChange}
              handleClick={this.handleClick}
              currentUser={currentUser}
            />
            {/* <div className="user-info-content">
              Email: {this.state.toggleEmailInput ? 
              <>
                <input 
                  name="email" 
                  className="user-input" 
                  type="email" 
                  placeholder="Enter email..." 
                  onChange={this.handleChange}
                  autoFocus={true}
                /> 
                <button className="info-cancel" onClick={this.toggleEmailInput}>Cancel</button>
                <button className="info-save" onClick={this.handleClick}>Save</button>
              </>
              : 
              <>
              {this.renderEmail(currentUser)}
                <button className="edit-info">
                  <FaPen onClick={this.toggleEmailInput}/>
                </button>
              </>}
            </div>
            <div className="user-info-content">
               {this.state.togglePhoneInput ? 
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  name="phone" 
                  className="user-input" 
                  type="tel" 
                  placeholder="Enter phone..." 
                  value={this.state.phone}
                  onChange={this.handleChange}
                  autoFocus={true}
                /> 
                <button className="info-cancel" onClick={this.togglePhoneInput}>Cancel</button>
                <button className="info-save" onClick={this.handleClick}>Save Changes</button>
              </div>
              : 
              <>
              {this.renderPhone(currentUser)}
                <button className="edit-info">
                  <FaPen onClick={this.togglePhoneInput}/>
                </button>
              </>}
            </div> */}
        </div>
              {/* <div className="dash-content">
                <div className="user-info-title">
                  <h3>Employee Schedule</h3>
                </div>
                <EmployeeSchedule 
                  contacts={contacts}
                  schedule={schedule}
                  currentUser={currentUser}
                />
              </div> */}
            <div className="dash-content">
              <div className="user-info-title">
                <h3>Employee Contact List</h3>
              </div>
              <ContactList contacts={contacts} />
            </div>
              {this.adminCheck(currentUser) ? 
              (
              <div className="dash-content">
                <NewUser createUser={this.props.createUser} />
                <DeleteUser 
                  currentUser={this.props.currentUser} 
                  removeUser={this.props.removeUser} 
                  contacts={this.props.contacts} 
                />
              </div>
              ) : null }
      </section>
    );
  }
}