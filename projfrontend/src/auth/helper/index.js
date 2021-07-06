import {API} from "../../backend"
//API means ; http://localhost:8000/api/


export const signup = (user) =>{  //user as parameter which come in json from frontend
    return fetch(`${API}/signup`, {  //just the same thing that we used to do in postman
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then( response =>{  //if all good then return the response to frontend
        return response.json()})
    .catch( err => console.log(err)) //if err then throw it to frontend

}

export const signin = user => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

 

export const authenticate = (data, next)=>{
    if( typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data)) //set the token if the user is signned in 
        next();

    }
}

export const signout = (next)=>{ //we used signout as middleware so that we can get option to do a callback when user is signout(redirect the user)
    if( typeof window !== "undefined"){
        localStorage.removeItem("jwt") //remove the token
        next();

        return fetch(`${API}/signout`, {
            method: "GET"
        })
        .then( response => console.log("signout sucess"))
        .catch( err => console.log(err))

    }


}



export const isAuthenticated = ()=>{
    if( typeof window=="undefined"){  //in the window object 'jwt' and stuff are saved
        return false;
    }

        //if we get the window object
    if(localStorage.getItem("jwt")){
        return JSON.parse( localStorage.getItem("jwt"));
    }
    else{
        return false;
    }

}
