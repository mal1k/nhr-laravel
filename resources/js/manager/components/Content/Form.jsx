import React from "react";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from "./Input";

class Form extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            submited: false,
            inputs: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount()
    {
        this.props.prerequisiteCallback();
    }

    componentWillUnmount()
    {
        this.props.destroy();
    }

    handleSubmit(e) {
        // e.preventDefault();
        // this.setState({submited: true});
    }

    handleInput(object) {
        // let $inputs = this.state.inputs;
        // this.state.inputs.map((value, index) => {
        //     if (value.name === object.name) {
        //         $inputs[ index ].value = object.value;
        //     }
        // });
        // this.setState({inputs: $inputs});
    }

    renderItem()
    {
        let $output = [];

        if ( 
            Object.keys( this.props.item ).length > 0 &&
            Object.keys( this.props.attributes ).length > 0 
        ) {
            this.props.attributes.map((value, index) => {
                for ( let prop in this.props.item )
                {
                    if ( this.props.item.hasOwnProperty( prop ) ) {
                        if ( value.name === prop ) {
                            value.value = this.props.item[ prop ];
                            break;
                        }
                    }
                }

                if (value.type === "textarea") {
                    $output.push(
                        <div key={ index } className="mb-1">
                            <label className="form-label" htmlFor={ "input-" + index }>
                                { value.label }
                            </label>
                            <textarea
                                id={ "input-" + index }
                                name={ value.name } 
                                placeholder={ value.placeholder }>
    
                                { value.value }
    
                            </textarea>
                        </div>
                    );
                } else if (value.type === "hidden") {
                    $output.push(
                        <span key={ index }>
                        <span className="text-secondary">{ "ID: " + value.value }</span>
                        <input type="hidden" name={ value.name } defaultValue={ value.value } />
                        </span>
                    );
                } else {
                    $output.push(
                        <div key={ index } className="mb-3">
                            <label className="form-label" htmlFor={ "input-" + index }>
                                { value.label }
                            </label>
                            <input 
                                id={ "input-" + index }
                                type={ value.type } 
                                name={ value.name } 
                                defaultValue={ value.value }
                                placeholder={ value.placeholder }
                                className="form-control" />
                        </div>
                    );
                }
            });
        }

        return $output;
    }

    /*
     * The main method of the object
    */
    render()
    {
        return (
            <div className="card">
                <div className="card-header pl-2">
                    <Link 
                        to={ this.props.indexLink }
                        className="btn btn-link"
                        data-object="expandable"
                    >
                        <FontAwesomeIcon 
                            icon={ ["fas", "chevron-left"] } 
                            size="1x" />
                        <span>
                            Back to all
                        </span>
                    </Link>
                    <span>{ this.props.currentText }</span>
                </div>
                <div className="card-body">
                    <form onSubmit={ this.handleSubmit }>

                        { this.renderItem() }

                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;