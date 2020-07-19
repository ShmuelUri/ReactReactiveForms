import React, { Component } from 'react';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";
 import { Redirect } from "react-router-dom";


const TextInput = ({ handler, touched, hasError, meta }) => (
  <div>
    <input placeholder={`Enter ${meta.label}`} {...handler()}/>
    <span>
        {touched
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>  
)

export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
          redirectToReferrer: false,
          from : this.props.location.state ? this.props.location.state.from : { pathname: "/" } ,
        }
        console.log(this.state.from);
        
      }
    

    loginForm = FormBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        rememberMe: false
    });

    login = () => {
      let newState = Object.assign({}, this.state);
      newState.redirectToReferrer = true;
      this.setState(newState);

    }

    handleReset=() => {
        this.loginForm.reset();
    }

    handleSubmit=(e) => {
        e.preventDefault();
        console.log("Form values", this.loginForm.value);
        AuthService.isAuthenticated = true;
        this.login();     

    }

    render() {
      if (this.state.redirectToReferrer) {
          return <Redirect to={this.state.from} />;
      }

      return (
            <FieldGroup
              control={this.loginForm}
              render={({ get, invalid }) => (
                <form onSubmit={this.handleSubmit}>

                  <FieldControl
                    name="username"
                    render={TextInput}
                    meta={{ label: "Username" }}
                  />

                  <FieldControl
                    name="password"
                    render={TextInput}
                    meta={{ label: "Password" }}
                  />

                  <FieldControl
                    name="rememberMe"
                    render={({handler}) => (
                      <div>
                        <input {...handler("checkbox")}/>
                      </div>
                    )}
                  />
                  <button
                    type="button"
                    onClick={this.handleReset}
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={invalid}
                  >
                    Submit
                  </button>
                  
                </form>
              )}
            />
      );
    }
}

export const AuthService = {
  isAuthenticated: false
}

