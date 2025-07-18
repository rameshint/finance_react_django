import React from "react";
import { logout } from '../utils/auth';

function Navbar() {
    return (
        <nav className="app-header navbar navbar-expand bg-body">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button">
                            <i className="bi bi-list"></i>
                        </a>
                    </li>
                    <li className="nav-item d-none d-md-block"><a href="#" className="nav-link">Home</a></li>
                    <li className="nav-item d-none d-md-block"><a href="#" className="nav-link">Contact</a></li>
                </ul>

                <ul className="navbar-nav ms-auto">
                     
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={logout}>
                            <i title="Logout" class="bi bi-box-arrow-right"></i>
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


export default Navbar;