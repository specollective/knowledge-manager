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
           <Link to="/concepts/formal-science">Formal Sciences</Link>
         </li>
         <li>
           <Link to="/concepts/physical-science">Physical Sciences</Link>
         </li>
       </ul>
     </nav>
 );
}

export default NavigationBar;
