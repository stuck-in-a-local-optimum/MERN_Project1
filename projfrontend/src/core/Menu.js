import React, {Fragment} from 'react'
import { Link, withRouter  } from 'react-router-dom';
import {signout, isAuthenticated} from "../auth/helper"

const currentTab = (history, path)=>{
    if(history.location.pathname===path){
        return {color: "#27AE60"};
    }
    else{
        return {color: "#FFFFFF"};
    }
};


const Menu = ({history})=> (
  
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style = {currentTab(history, "/")} className="nav-link" to ="/">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link style = {currentTab(history, "/cart")} className="nav-link" to ="/cart">
                        Cart
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                    <Link style = {currentTab(history, "/user/dashboard")} className="nav-link" to ="/user/dashboard">
                        U. Dashboard
                    </Link>
                </li>
                )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link style = {currentTab(history, "/admin/dashboard")} className="nav-link" to ="/admin/dashboard">
                    A. Dashboard
                </Link>
            </li>

            )}

                
                    {!isAuthenticated() && ( //fragment tag is just to render multiple children together, here we only want to show signin and sign up route to the user who are not yet signed in
                                        <Fragment>  

                                        <li className="nav-item">
                                            <Link style = {currentTab(history, "/signup")} className="nav-link" to ="/signup">
                                                Signup
                                            </Link>
                                        </li>
                        
                                        <li className="nav-item">
                                            <Link style = {currentTab(history, "/signin")} className="nav-link" to ="/signin">
                                                Sign In
                                            </Link>
                                        </li>
                        
                                        </Fragment>
                    )}

                
                {isAuthenticated() && ( //we only want to show signout button to the user who is already signed in
                    <li className="nav-item">

                    {/* <Link style = {currentTab(history, "/signout")} className="nav-link" to ="/signout">
                        Signout
                    </Link>
                </li> */}
                <span className = "nav-link text-warning"  //we want to wrap anything on block level we use <div> and when on line level we use <span> tag
                        onClick = { () =>{
                            signout( ()=>{  //since singout is an middleware so we can fire out an call back inside it also to redirect the user
                                history.push("/") //redirect to home
                            })
                        }} >
                            Signout
                        </span>

                </li>
                  )}
                
            </ul>
              


        </div>
    )




export default withRouter(Menu);