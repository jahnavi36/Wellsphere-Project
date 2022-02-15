import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
 
const AdminNavigation = () => {
    return (
       <div className="container--navLinks">
       <NavLink className="navLink" to="/admin-search">Search Care Provider</NavLink>
          <NavLink className="navLink" to="/admin-patient-search">Search Patient</NavLink>
          <NavLink className="navLink" to="/admin-add-care-prov">Add Care Provider</NavLink>
          <NavLink className="navLink" to="/admin-add-patient">Add Patient</NavLink>
       </div>
    );
}
 
export default AdminNavigation;