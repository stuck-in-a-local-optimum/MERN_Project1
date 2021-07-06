import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated} from './index'



const PrivateRoute = ({ component : Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={ props =>
          isAuthenticated() ? (   //if authenticated 
            <Component {...props} /> //we want to load some components, what components? what is this props? we haven't decide it yet
          ) : ( //now we want to do if above fails (i.e not authenticated)
            <Redirect
              to={{
                pathname: "/signin",  //if not authenticated then redirect to signin page
                state: { from: props.location}
              }}
            />
          )
        }
      />
    );
  }


  export default PrivateRoute;