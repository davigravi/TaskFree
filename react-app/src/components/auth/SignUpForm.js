import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';
import './SignUpForm.css';


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if(errors.length === 0){
      const data = await dispatch(signUp(username, email, password))
    }else {
      setShowErrors(true)
    }

  };


  useEffect(() => {
    setShowErrors(false)
    const errors = [];
    if (username.length < 5)
      errors.push("Username must be at least 5 characters");
    if (username.length > 30) errors.push("Username must be less than 30 characters");
    // if(!username) errors.push("Please provide a username")
    // if(!password)errors.push("Please provide a password")
    if (!email.includes("@")) errors.push("Please provide a valid email");
    if (password.length < 5) errors.push("Please provide a longer password");
    if (repeatPassword !== password) errors.push("Your passwords do not match");
    setErrors(errors);
  }, [username, password, email, repeatPassword]);

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
          <h1>TaskFree</h1>
          <p className='mission-statement'>Daily task management made easy.</p>
          <div>
            {showErrors && errors.map((error, ind) => (
              <div className='signup-errors' key={ind}>{error}</div>
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
