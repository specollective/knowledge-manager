import React from "react";
import { Link } from "react-router-dom";

function NavigationBar () {
  return (
     <nav>
       <ul>
         <li>
           <Link to="/">Knowledge Manager</Link>
         </li>
         <li>
           <Link to="/concepts/software-engineering">Software Engineering</Link>
         </li>
       </ul>
     </nav>
 );
}

export default NavigationBar;
