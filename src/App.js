import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CountriesList from './components/CountriesList';
import { AppWrapper } from './App.style';

const App = () => (
  <Router>
    <AppWrapper>
      <Header />

      <Switch>
        <Route exact path='/' component={CountriesList} />
      </Switch>
    </AppWrapper>
  </Router>
);

export default App;
