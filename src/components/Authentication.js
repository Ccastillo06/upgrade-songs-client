import React, { useState } from 'react';
import axios from 'axios';
import { cookies } from 'brownies';

const URI = 'http://localhost:4001/auth';
const REGISTER = '/register';
const LOGIN = '/login';

const getUrl = isLogin => `${URI}${isLogin ? LOGIN : REGISTER}`;

function AuthorForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    if (email && password) {
      const url = getUrl(isLogin);
      const user = {
        email,
        password
      };

      axios
        .post(url, user)
        .then(res => {
          if (!isLogin) {
            setIsLogin(true);
            return;
          }

          const { token } = res.data;
          cookies.authToken = token;
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Change mode
      </button>
      <h2>Authentication - {isLogin ? 'Login' : 'Register'}</h2>
      <label>
        <span>Email</span>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        <span>Password</span>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
}

export default AuthorForm;
