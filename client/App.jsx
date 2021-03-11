import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainContainer from './containers/MainContainer';
import { HomePageViewProvider } from './contexts/HomePageViewContext';


import './styles.css';

function App() {
  return (
    <div className="main">
      <Switch >
        <Route
          exact
          path="/login"
          component={
            () => <LoginPage />
          }>         
        </Route>   
        <Route
          exact
          path="/"
          component={
            () => <HomePageViewProvider><MainContainer /></HomePageViewProvider>
          }>         
        </Route>        
    </Switch>
    </div>
  );
}



export default App;
