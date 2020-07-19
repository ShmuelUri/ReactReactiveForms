import React from 'react';
import './App.css';
import { Link, Route, Switch, Redirect } from "react-router-dom";
import {Login, AuthService} from './LoginComponent';
import AddProdect from './Products';



function App() {
  return (
    <div className="App">
      <header className="App-header">
            <Navbar/>
      </header>
      <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="products" component={AddProdect}/>
        <PrivateRoute path="/admin" component={Admin} />
      </Switch>
    </div>

    </div>
  );
}

function Home(){
  return (
    <h1>Home page</h1>
);
}

function Admin(){
  return (
    <h1>Admin page</h1>
);
}

const Navbar = ()=> {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/login">Login</Link>
          </li>
          <li>
              <Link to="/admin">Admin area</Link>
          </li>
        </ul>
      </nav>
    </div>
    );
}

/* PrivateRoute component definition */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        AuthService.isAuthenticated === true ? (  
            <Component {...props} />  
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default App;
