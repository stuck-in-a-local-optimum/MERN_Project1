import React  from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";






const AdminRoute = ({ component : Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={ props =>
          isAuthenticated() && isAuthenticated().user.role===1 ? (   //if user is admin
            <Component {...props} /> //we want to load some components, what components? what is this props? we haven't decide it yet
          ) : ( //now we want to do if above fails (i.e not admin)
            <Redirect
              to={{
                pathname: "/signin",  //if not authenticated thenr redirect to signin page
                state: { from: props.location}
              }}
            />
          )
        }
      />
    );
  }


  export default AdminRoute;