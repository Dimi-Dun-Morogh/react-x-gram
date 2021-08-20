import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import tgApi from './api/telegram';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import MyProfile from './pages/MyProfile/MyProfile';
import { setUser } from './redux/user/user.actions';


function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const areWeLogged = async () => {
      const user = await tgApi.getUser();
      if (!user) history.push('/login');
      else {
        dispatch(setUser(user));
        history.push('/my-profile');
         tgApi.getContacts()
      }
    };
    areWeLogged();
  }, [dispatch, history]);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/my-profile' component={MyProfile}/>
      </Switch>
    </div>
  );
}

export default App;
