import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';

function Login({ onLogin, setEmail }) {

   const navigate = useNavigate();

   const [formValue, setFormValue] = React.useState({
      email: '',
      password: ''
   });

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValue({
         ...formValue,
         [name]: value

      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      auth.login(formValue.email, formValue.password).then((data) => {
         onLogin();
         setEmail(formValue.email);
         navigate('/');
      })
         .catch((err) => console.error(`Ошибка авторизации пользователя: ${err}`));

   };

   return (
      <section className="login">
         <h2 className="login__title">Вход</h2>
         <form className="login__form" onSubmit={handleSubmit}>
            <input
               type="email"
               name="email"
               className="login__input"
               placeholder='Email'
               value={formValue.email}
               onChange={handleChange}>
            </input>
            <input
               type="password"
               name="password"
               className="login__input"
               placeholder='Пароль'
               value={formValue.password}
               onChange={handleChange}>
            </input>
            <button type="submit" className="login__button">Войти</button>
         </form>
      </section>
   )

}

export default Login;