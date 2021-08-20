import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button/Button';
import { useAppSelector } from '../../hooks/storeHooks';
import { logOut } from '../../redux/user/user.actions';
import './MyProfile.css';

const MyProfile = () => {
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.userState.user!);
  if (!user) return null;
  const { first_name, last_name } = user;

  return (
    <div className='user-profile'>
      <h1>user profile page</h1>
      <span>
        Your name is {first_name} {last_name}
      </span>
      <Button title='logout' onClick={() => dispatch(logOut())} />
    </div>
  );
};

export default MyProfile;
