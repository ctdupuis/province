import React from 'react';
import { FaPen } from 'react-icons/fa'

const renderEmail = email => {
    if (email) {
        return email 
    } else {
        return "No email on file"
    }
}

const renderPhone = phone => {
    if (phone) {
        return phone
    } else {
        return "No phone number on file"
    }
}

export default function ContactInfo({ toggleEmail, toggleEmailVal, email, togglePhone, togglePhoneVal, phone, handleChange, handleClick, currentUser }) {
    return (
        <div className="user-info-content">
            <div className="flex-container">

                <fieldset className="contact-info">
                    <legend>Email</legend>
                    {
                        toggleEmailVal ? 
                        <>
                            <div className="form-group">
                                <input
                                    name="email"
                                    className="user-input"
                                    type="email"
                                    autoFocus={true}
                                    defaultValue={currentUser.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <button className="info-save" onClick={handleClick}>Save</button>
                                <button className="info-cancel" onClick={toggleEmail}>Cancel</button>
                            </div>
                        </>
                        :
                        <div className="form-group">
                            <h4>{renderEmail(currentUser.email)}</h4>
                            <button className="info-save fieldset-btn" onClick={toggleEmail}>
                                Change
                            </button>
                        </div>
                    }

                </fieldset>

                <fieldset className="contact-info">
                    <legend>Phone</legend>
                    {
                        togglePhoneVal ? 
                        <>
                            <div className="form-group">
                                <input
                                    name="phone"
                                    className="user-input"
                                    type="tel"
                                    autoFocus={true}
                                    defaultValue={currentUser.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <button className="info-save" onClick={handleClick}>Save</button>
                                <button className="info-cancel" onClick={togglePhone}>Cancel</button>
                            </div>
                        </>
                        :
                        <div className="form-group">
                            <h4>{renderPhone(currentUser.phone)}</h4>
                            <button className="info-save fieldset-btn" onClick={togglePhone}>
                                Change
                            </button>
                        </div>
                    }

                </fieldset>
            </div>      
        </div>
    )
}

// Email: {this.state.toggleEmailInput ? 
//     <>
//       <input 
//         name="email" 
//         className="user-input" 
//         type="email" 
//         placeholder="Enter email..." 
//         onChange={this.handleChange}
//         autoFocus={true}
//       /> 
//       <button className="info-cancel" onClick={this.toggleEmailInput}>Cancel</button>
//       <button className="info-save" onClick={this.handleClick}>Save</button>
//     </>