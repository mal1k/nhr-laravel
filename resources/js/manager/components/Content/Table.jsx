import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Table extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.renderPoles = this.renderPoles.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount()
    {
        this.props.prerequisiteCallback();
    }

    handleEdit(e) 
    {
        this.props.onEdit(e.target);
    }

    renderPoles()
    {
        if ( this.props.data.attributes ) {
            return this.props.data.attributes.map((value, index) => {
                return (
                    <th key={ index }>
                        { value.name }
                    </th>
                );
            });
        }

        return;
    }

    renderContent()
    {
        if (this.props.data.items) {
            return this.props.data.items.map((value, index) => {
                return (
                    <tr key={ index }>
                        { this.renderItem(value) }
                    </tr>
                );
            });
        }

        return;
    }

    renderItem(item) 
    {
        let i = 0;
        let output = [];
        for (let prop in item) {
            if (item.hasOwnProperty( prop )) {
                output.push(
                    <th key={ i++ }>
                        { item[prop] }
                    </th>
                );
            }
        }
        output.push(
            <th key={ i++ }>
                <div className="btn-group">
                    <span
                        className="btn btn-light btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                        data-bs-display="static"
                        aria-expanded="false">

                        <FontAwesomeIcon 
                            icon={ ["fas", "ellipsis-h"] } 
                            size="1x" />
                        
                    </span>
                    <ul className="dropdown-menu dropdown-menu-lg-end">
                        <li>
                            <Link 
                                to={ this.props.indexLink + "/edit/" + item.id }
                                className="dropdown-item"
                                data-id={ item.id }
                                onClick={ this.props.onEdit }
                            >
                                Edit
                            </Link>
                        </li>
                    </ul>
                </div>
            </th>
        );
        return output;
    }

    /*
     * The main method of the object
    */
    render() 
    {
        return (
            <div className="card">
                <div className="card-body">
                    <Link 
                        to="/manager/users/create" 
                        className="btn btn-sm btn-primary mb-2" 
                        title="Add an user"
                    >
                        Create
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-hover text-nowrap mb-5">
                            <thead>
                                <tr>
                                    { this.renderPoles() }
                                    <th width="20px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.renderContent() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Table;