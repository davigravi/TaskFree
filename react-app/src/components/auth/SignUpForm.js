import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='background-div'>



      <div className='signup-form-container'>


        <form onSubmit={onSignUp}>
          <h1>Sign Up</h1>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='text-field'>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
              ></input>
            <span></span>
            <label>User Name</label>
          </div>
          <div className='text-field'>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required
              ></input>
            <span></span>
            <label>Email</label>
          </div>
          <div className='text-field'>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
              ></input>
            <span></span>
            <label>Password</label>
          </div>
          <div className='text-field'>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              ></input>
            <span></span>
            <label>Repeat Password</label>
          </div>
          <button className='signup-button' type='submit'>Sign Up</button>
        </form>

        <div className='login-link'>Already Have an Account? <NavLink className='login-navlink' to='/login'>Log In</NavLink></div>
      </div>
    </div>
  );
};

export default SignUpForm;
