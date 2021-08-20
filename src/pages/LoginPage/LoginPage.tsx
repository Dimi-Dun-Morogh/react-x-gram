import React, { useEffect, useState } from 'react';
import tgApi from '../../api/telegram';
import { TgUser } from '../../types';
import './LoginPage.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';

import {

  fetchUser
} from '../../redux/user/user.actions';
import { useAppSelector } from '../../hooks/storeHooks';

const LoginPage = () => {
  const user = useAppSelector((state) => state.userState);
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('9996628504');
  const [code, setCode] = useState('222222');
  const [phoneHash, setHash] = useState('');


  const submitPhone = async () => {
    const data = await tgApi.sendCode(phone);
    setHash(data.phone_code_hash);
    console.log('set hash');
  };

  const signWithCode = async () => {
    const data = await tgApi.signIn({
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phoneHash,
    });
    console.log('signWithCode', data);
  };



  // useEffect(() => {
  //   tgApi.getUser().then((data) => setUser(data));
  // }, []);

  return (
    <>
      <span>login page - you are {user ? 'logged in' : 'not logged in'}</span>
      <div className='login-form'>
        {!phoneHash ? (
          <div className='login-form-section'>
            <Input
              type='number'
              value={phone}
              placeholder='enter your phone'
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button title='sign In' onClick={submitPhone} />
          </div>
        ) : (
          <div className='login-form-section'>
            <Input
              type='number'
              value={code}
              placeholder='enter secret code'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCode(e.target.value)
              }
            />
            <Button onClick={signWithCode} title='enter code' />
          </div>
        )}

        <button onClick={() => tgApi.signUp(phone, phoneHash)}>signUp</button>
        <button
          onClick={() => {
            console.log(user);

            dispatch(fetchUser());
          }}
        >
          get contacts
        </button>
      </div>
    </>
  );
};

export default LoginPage;
