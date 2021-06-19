import React from "react";

class Input extends React.Component
{
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.props.onInput({name: e.target.name, value: e.target.value});
    }

    render() {
        return (
            <>
            <input 
                type="text" 
                className="form-control"
                name={ this.props.name }
                value={ this.props.value } 
                onInput= { this.handleInput } />
            </>
        );
    }
}

export default Input;