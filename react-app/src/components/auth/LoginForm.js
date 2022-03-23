import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let username = 'Demo'
    let password = 'password'
    dispatch(login(email, password))
  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='background-div'>



      <div className='login-form-container'>




        <form onSubmit={onLogin}>
          <h1>TaskFree</h1>
          <div>
            {errors.map((error, ind) => (
              <div className='login-errors' key={ind}>{error}</div>
            ))}
          </div>
          <div className='text-field'>
            <input
              name='email'
              type='text'
              value={email}
              onChange={updateEmail}
              required
            />
            <span></span>
            <label htmlFor='email'>Email</label>
          </div>
          <div className='text-field'>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <button className='login-button' type='submit'>Login</button>
        </form>
        <button id='demo-login' onClick={demoLogin}>Demo User</button>

        <div className='signup-link'>Don't Have an Account? <NavLink className='signup-navlink' to='/sign-up'> Sign Up</NavLink></div>
      </div>
    </div>
  );
};

export default LoginForm;
