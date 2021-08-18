import React, { useEffect, useState } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import tgApi from './api/telegram';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  const [logged, setLogged] = useState(false);
  const history = useHistory();
  useEffect(()=>{
    if(!logged) history.push('/login');
    // tgApi.sendCode('')
  },[logged])

  return (
    <div className="App">
    <Switch>
      <Route exact path="/login" component={LoginPage}/>
    </Switch>
    </div>
  )
}

export default App;
