import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'
import ConceptPage from './ConceptPage'
import HomePage from './HomePage'
import ReviewPage from './ReviewPage'
import ConceptCreatePage from './ConceptCreatePage'
import ConceptEditPage from './ConceptEditPage'


function AppRouter() {
  return (
   <Router>
     <div>
       <NavigationBar />
       <Route path="/" exact component={HomePage} />
       <Route path="/new" component={ConceptCreatePage} />
       <Route path="/edit/:slug" component={ConceptEditPage} />
       <Route path="/review/:slug" component={ReviewPage} />
       <Route path="/learn/:slug" component={ConceptPage} />
     </div>
   </Router>
 );
}

export default AppRouter;
