import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
 
const CareProvNavigation = () => {
    return (
       <div className="container--navLinks">
          <NavLink className="navLink" to="/care-prov-search">Search</NavLink>
          <NavLink className="navLink" to="/care-prov-add-patient">Add Patient</NavLink>
       </div>
    );
}
 
export default CareProvNavigation;