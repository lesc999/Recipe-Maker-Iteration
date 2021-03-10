import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import { HomePageViewProvider } from './contexts/HomePageViewContext';

import './styles.css';

function App() {
  return (
    <div className="main">
      <HomePageViewProvider>
        <MainContainer />
      </HomePageViewProvider>
    </div>
  );
}

export default App;
