import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../components/static/Loading';
import {
    getItems,
    addItems,
    updateItem
} from "../actions/items";
import { 
    createCheckEntry,
    getReport
} from "../actions/log-entries";
import { endSession } from '../actions/sessions';
import Inventory from "../components/inventory/Inventory";
import ReportManager from "../components/reports/ReportManager";
import Tabs from "../components/static/Tabs";

class ReportsContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <Route 
                    exact 
                    path={"/inventory"}
                    render={(props) => (
                    <>
                        <Tabs endSession={this.props.endSession}/>
                        <Inventory
                            currentUser={this.props.currentUser}
                            getItems={this.props.getItems}
                            addItems={this.props.addItems}
                            updateItem={this.props.updateItem}
                            items={this.props.items}
                            loading={this.props.loading}
                            {...props}
                        />
                    </>
                    )}
                />
                <Route 
                    exact 
                    path={"/reports"}
                    render={(props) => (
                    <>
                        <Tabs endSession={this.props.endSession}/>
                        <ReportManager
                            currentUser={this.props.currentUser}
                            loading={this.props.loading}
                            createCheckEntry={this.props.createCheckEntry}
                            getReport={getReport}
                            {...props}
                        />
                    </>
                    )}
                />
            </React.Fragment>
        )
    }
}

export default connect(
    (state) => ({
        currentUser: state.userReducer.currentUser,
        items: state.itemsReducer.items
        // loading: state.loadingReducer.loading
    }),
    {
        getItems,
        addItems,
        updateItem,
        createCheckEntry,
        endSession
    }
)(ReportsContainer);