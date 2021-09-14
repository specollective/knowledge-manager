import React from "react";
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from "react-router-dom";
import NavigationBar from './NavigationBar'

interface MatchProps {
  slug: string
}

function HomePage () {
  return <h1>Welcome!</h1>;
}

const ConceptPage = ({ match }: RouteComponentProps<MatchProps>) =>   {
  return <h2>{match.params.slug}</h2>;
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
