import React from 'react'
import { Link } from "react-router-dom";

//define header the function
//note: We use className instead of class in ReactJs

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn btn-success" to="/Add">+ Add</Link>
                    </li>
                </ul>
            </div>
        </nav>
        )
}

export default Header