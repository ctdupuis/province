import React, { Component } from 'react';
import NewItemForm from './NewItemForm';
import "../../stylesheets/logs/inventory.css";
import Loading from '../static/Loading';
import { FaPen } from 'react-icons/fa';

export default class Inventory extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    tableHeaders = () => {
        return(
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Of Measurement</th>
                </tr>
            </thead>
        )
    }

    tableBody = items => {
        const tabledata = items.map(item => {
            return(
            <tr key={item.id}>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit_of_measurement}</td>
                <td>
                <button className="edit-info">
                  <FaPen />
                </button>
                </td>
            </tr>)
        })
        return(
            <tbody>
                {tabledata}
            </tbody>
        )
    }

    render() {
        const items = this.props.items
        const shippingItems = items.filter(item => item.category === "Shipping Supplies")
        const cleaningItems = items.filter(item => item.category === "Cleaning Supplies")
        const officeItems = items.filter(item => item.category === "Office Supplies")
        const loading = this.props.loading
        return (
            loading ? <Loading /> :
            <section className="dash-container">
                <div className="dash-content">
                    <div className="user-info-title">
                        <h3>Add An Item</h3>
                    </div>
                    <NewItemForm addItems={this.props.addItems} />
                    <div className="user-info-title">
                        <h3>Shipping Supplies</h3>
                    </div>
                    <table className="contact-list">
                        {this.tableHeaders()}
                        {this.tableBody(shippingItems)}
                    </table>

                    <div className="user-info-title">
                        <h3>Cleaning Supplies</h3>
                    </div>
                    <table className="contact-list">
                        {this.tableHeaders()}
                        {this.tableBody(cleaningItems)}
                    </table>

                    <div className="user-info-title">
                        <h3>Office Supplies</h3>
                    </div>
                    <table className="contact-list">
                        {this.tableHeaders()}
                        {this.tableBody(officeItems)}
                    </table>
                </div>
            </section>
        )
    }
}
