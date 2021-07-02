import { func } from 'prop-types'
import React  from 'react'
import "../styles.css";
import {API} from "../backend.js"
import Base from "./Base.js"

export default function Home(){
    console.log("API IS", API);

    return (
        <Base title="Home Page" description="Welcome to the tshrit store">
            <div className="row">
            <div className="col-4">
                <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                </div>
        </Base>
    )
}