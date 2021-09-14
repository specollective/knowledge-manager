import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'
import ConceptPage from './ConceptPage'

function HomePage () {
  return <h1>Welcome!</h1>
}

function AppRouter() {
  return (
   <Router>
     <div>
       <NavigationBar />
       <Route path="/" exact component={HomePage} />
       <Route path="/concepts/:slug" component={ConceptPage} />
     </div>
   </Router>
 );
}

export default AppRouter;
