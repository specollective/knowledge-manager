import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function HomePage () {
  return <h1>Welcome!</h1>;
}

function ConceptPage ({ match }) {
  return <h2>{match.params.slug}</h2>;
}

function AppRouter() {
  return (
   <Router>
     <div>
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

       <Route path="/" exact component={HomePage} />
       <Route path="/concepts/:slug" component={ConceptPage} />
     </div>
   </Router>
 );
}

export default AppRouter;
