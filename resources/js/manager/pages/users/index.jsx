import React from "react";
import { Link, Route, Switch, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "../../components/Content/Form";
import Table from "../../components/Content/Table";
import NoMatch from "../errors/404";

class Users extends React.Component
{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            attributes: [],
            items: [],
            item: {},
        };

        this.handleLoadOfEditedItem = this.handleLoadOfEditedItem.bind(this);
        this.handleLoadOfTable = this.handleLoadOfTable.bind(this);
        this.handleUnmountForm = this.handleUnmountForm.bind(this);
    }

    get newItem() {
        let $attributes = {
            attributes: [ 
                {name: "id", type: "hidden", value: "", placeholder: "", label: "ID"}, 
                {name: "name", type: "text", value: "", placeholder: "Type a name...", label: "Name"}, 
                {name: "email", type: "email", value: "", placeholder: "Type an email...", label: "Email"}, 
                {name: "password", type: "password", value: "", placeholder: "Type a password...", label: "Password"} 
            ]
        };
        return $attributes;
    }

    prepareDataForForm( $data )
    {
        let output = {};

        if (
            Object.prototype.toString.call( $data ) === "[object Object]" &&
            !Array.isArray( $data )
        ) {
            delete $data.created_at;
            delete $data.updated_at;
            delete $data.email_verified_at;
            output = $data;
        }

        return output;
    }

    prepareDataForTable( $data )
    {
        let $bulkData = [];

        if ( Array.isArray( $data ) ) {
            $bulkData = $data.map(element => {
                delete element.created_at;
                delete element.updated_at;
                delete element.email_verified_at;
                element.password = "••••••••";
                return element;
            });
        }

        return $bulkData;
    }

    getAttributesForTable()
    {
        return [
            {name: "id"}, 
            {name: "name"}, 
            {name: "email"}, 
            {name: "password"}
        ];
    }

    getAttributesForForm()
    {
        return [ 
            {name: "id", type: "hidden", value: "", placeholder: "", label: "ID"}, 
            {name: "name", type: "string", value: "", placeholder: "Type a name...", label: "Name"}, 
            {name: "email", type: "email", value: "", placeholder: "Type an email...", label: "Email"}, 
            {name: "password", type: "password", value: "", placeholder: "Type a password...", label: "Password"} 
        ];
    }

    handleUnmountForm()
    {
        this.setState({
            attributes: [],
            item: {},
        });
    }

    handleLoadOfTable()
    {
        fetch("/manager/get-users")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    attributes: this.getAttributesForTable(),
                    items: this.prepareDataForTable(data)
                });
            })
            .catch(error => console.error("We've got an error!", error));
    }

    handleLoadOfEditedItem( e )
    {
        // let location = Location();

        if ( e !== undefined ) {
            $target = e.target.dataset.id;
        } else {
            console.log(this.props.match);
        }

        // let fetchParams = {
        //     method: "POST",
        //     headers: {
        //         "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
        //         "Content-Type": "application/json;charset=utf-8",
        //     },
        //     body: JSON.stringify({
        //         "user-id": $target
        //     }),
        // };

        // fetch("/manager/get-user", fetchParams)
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             attributes: this.getAttributesForForm(),
        //             item: this.prepareDataForForm(data)
        //         });
        //     })
        //     .catch(error => console.error("We've got an error!", error));
    }

    render() {
        const { match, location, history } = this.props;

        return (
            <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Users</h1>
                        </div>
                        <div className="col-sm-6">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb float-md-end">
                                    <li className="breadcrumb-item">
                                        <Link to="/manager/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Users</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/manager/users/create">
                            <Form 
                                currentText="Create an user"
                                currentItem={ this.newItem } 
                                indexLink="/manager/users" />
                        </Route>
                        <Route exact path="/manager/users/edit/:id">
                            <Form 
                                prerequisiteCallback={ this.handleLoadOfEditedItem }
                                currentText="Edit the user"
                                attributes={ this.state.attributes } 
                                item={ this.state.item }
                                indexLink="/manager/users"
                                destroy={ this.handleUnmountForm } />
                        </Route>
                        <Route exact path="/manager/users">
                            <Table 
                                prerequisiteCallback={ this.handleLoadOfTable }
                                indexLink="/manager/users"
                                data={ this.state }
                                onEdit={ this.handleLoadOfEditedItem } />
                        </Route>
                        <Route path="*">
                            <NoMatch />
                        </Route>
                    </Switch>
                </div>
            </section>
            </>
        );
    }
}

export default withRouter(Users);