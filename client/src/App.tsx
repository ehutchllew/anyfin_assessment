import React from 'react';
import { Login } from './auth/Login';
import { BrowserRouter, Route }from 'react-router-dom'
import { Landing } from './dashboard/Landing';
function App() {
  return (
    <BrowserRouter>
      <Route component={Login} exact path="/" />
      <Route component={Landing} exact path="/dashboard" />
    </BrowserRouter>
  );
}

export default App;
