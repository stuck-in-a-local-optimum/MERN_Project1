import React, {useState} from 'react'
import Base from "../core/Base.js"
import { isAuthenticated } from '../auth/helper/index.js';
import { Link } from 'react-router-dom';
import {createCategory} from "./helper/adminapicall"




const AddCategory = ()=>{
    const  [name, setName] = useState("")
    const  [error, setError] = useState(false)
    const  [success, setSuccess] = useState(false)

    //destructuring
    const {user, token} = isAuthenticated();

    const goBack = ()=>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard"> Admin Home</Link>
        </div>
    );

    const handleChange = (event) =>{
        setError(""); //set error empty
        setName(event.target.value)  //we don't interact with these name/error,we always use setName/setError

        
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setError(""); 
        setSuccess(false);  //we will set to true when we recieve submit response
        
       


        //backend request fired
        //we have destructure them above
        createCategory(user._id, token, {name})    //we {name} 'cause we have done body: JSON.stringyfy in createCategory method in adminapicalls.js
        .then(data => {
            if(data.error){
                setError(true)

            }
            else{
                setError("")
                setSuccess(true)
                setName("");
            }
        })
    }


        const successMessage = ()=>{
            if(success){
                return <h4 className="text-success">Category created successfully</h4>
            }

        }


        const warningMessage = ()=>{
            if(error){
                return <h4 className="text-success">Failed to create category</h4>
            }

        }



    //function for my category form
    const myCategoryForm = ()=>(
        <form>
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-3"
                onChange = {handleChange}
                value = {name}
                autoFocus
                required
                placeholder="For example summer"/>

                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>

    )


    return (


        <Base title="Create a category here" description="Add a new category for new tshirts" className="container bg-info p-4">

            <div className = "row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                {myCategoryForm()}
                {goBack()}
                </div>
                
            </div>


        </Base>


    );
};


export default AddCategory;