import React, {useState} from 'react'

import Base from "../core/Base"

import { Link } from 'react-router-dom'
import { signup } from '../auth/helper';


const Signup = ()=>{
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false

    });
    //these all values that we are putting in useState are part of that 'values'

    const {name, email, password, error, success} = values; //destructuring

        const handleChange = name => event => {  //higher order function in Js xD
            //any given if we want to modify/edit anything we use setValues method which accepts objects that we want to manipulate
            setValues({...values, error: false, [name]: event.target.value})

        }

        const onSubmit = event => {
            event.preventDefault()
            setValues( {...values, error: false, })
            signup({name, email, password})
            .then( data  =>{
                if(data.error){
                    setValues({...values, error: data.error, success:false})
                }
                else{
                    setValues({
                        ...values, 
                        name: "", 
                        email: "",
                    password: "",
                error: "",
            success: true
        })
                }
            })
            .catch(console.log("Error in signup"))
        }

    const signUpForm = ()=>{
        return (
            <div className="row">
                <div className = "col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className = "form-group">
                            <label className = "text-light">Name</label>
                            <input className = "form-control" onChange = {handleChange("name")} type = "text" value={name} />
                        </div>

                        <div className = "form-group">
                            <label className = "text-light">Email</label>
                            <input className = "form-control" onChange = {handleChange("email")} type = "text" value={email} />
                        </div>

                        <div className = "form-group">
                            <label className = "text-light">Password</label>
                            <input className = "form-control" onChange = {handleChange("password")} type = "password" value={password} />
                        </div>
                       
                        <button onClick = {onSubmit} className = "bt btn-success btn-block"> Submit</button>
                    </form>
                </div>
                

            </div>
        )

    }

    const successMessage = () =>{
        
        return (
            <div className="row">
                <div className = "col-md-6 offset-sm-3 text-left">
        <div className = "alert alert-success"
        style = { { display: success ? "" : "none" } }
        >
            New account was created successfully, Please 
            <Link to="/signin"> Login Here</Link>
        </div>
        </div>
        </div>
        );
    };

    const errorMessage = () =>{
        return(
            <div className="row">
                <div className = "col-md-6 offset-sm-3 text-left">
        <div className = "alert alert-danger"
        style = { { display: error ? "" : "none" } }
        >
            {error}       
             </div>
             </div>
             </div>
        );
    };

    

    
    return (
        <Base title = "Sign up page" description="A page for user to signup!">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        <p className= "text-white text-center"> {JSON.stringify(values)}</p>

        
        </Base>

        

    )
}

export default Signup;