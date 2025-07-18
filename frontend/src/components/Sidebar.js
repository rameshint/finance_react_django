import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from "../constants/menuItems";

function Sidebar() {
    const location = useLocation();
    return (
        <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
            <div class="sidebar-brand">
                <a href="#" class="brand-link">
                    <img
                        src="/adminlte/assets/img/AdminLTELogo.png"
                        alt="AdminLTE Logo"
                        class="brand-image opacity-75 shadow"
                    />
                    <span class="brand-text fw-light">AdminLTE 4</span>
                </a>
            </div>


            <div class="sidebar-wrapper">
                <nav class="mt-2">
                    <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false" >
                        {menuItems.map((item, index) => (
                            !item.hide && (
                                <li key={index} class="nav-item">
                                    <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                                        <i className={`nav-icon ${item.icon}`}></i>
                                        <p>{item.label}</p>
                                    </Link>
                                </li>
                            )
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;