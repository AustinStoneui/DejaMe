import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import '../SignUp.css';
import { auth } from "../../firebase";

function SignUp() {

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push('/')
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it successfully created a new user with email and password
        if (auth) {
          history.push('/')
        }
      })
      .catch(error => alert(error.message))
  }
  return (

    <div className='signUp'>
      <Link to='/'>
        <img
          className="signUp__logo"
          src='https://www.tattoomenow.com/tattoo-designs/wp-content/uploads/2018/12/Letter-D-Tattoo-Template-04.jpg'
        />
      </Link>

      <div className='signUp__container'>
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className='signUp__signInButton'>Sign In</button>
        </form>

        <p>
          By signing-in you agree to Deja'Me Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button onClick={register} className='signUp__registerButton'>Create your Deja'Me Account</button>
      </div>
    </div>
  )
}

export default SignUp;
