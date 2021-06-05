import React, { Component } from 'react';
import { LocalForm, Errors } from 'react-redux-form';
import { Button } from 'reactstrap';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<= len);
const minLength = (len) => (val) => !(val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));

class AddCDOfferings extends Component{

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        console.log("This is working i hope");
    }
    
    handleSubmit(values){
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <LocalForm>

                </LocalForm>
            </div>
        )
    }
}

export default AddCDOfferings;