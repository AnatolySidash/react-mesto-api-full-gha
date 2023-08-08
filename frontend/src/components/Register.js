import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';

function Register({ setSuccessSignUp, onTooltipOpen }) {

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
      const { email, password } = formValue;
      auth.register(email, password).then((data) => {
         navigate('/sign-in', { replace: true });
         setSuccessSignUp(true);
         onTooltipOpen();
      })
         .catch((err) => {
            setSuccessSignUp(false);
            onTooltipOpen();
            console.error(`Ошибка регистрации нового пользователя: ${err}`)
         });

   };

   return (
      <section className="register">
         <h2 className="register__title">Регистрация</h2>
         <form className="register__form" onSubmit={handleSubmit}>
            <input
               type="email"
               name="email"
               className="register__input"
               placeholder='Email'
               value={formValue.email}
               onChange={handleChange}>
            </input>
            <input
               type="password"
               name="password"
               className="register__input"
               placeholder='Пароль'
               value={formValue.password}
               onChange={handleChange}>

            </input>
            <button type="submit" className="register__button">Зарегистрироваться</button>
            <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
         </form>
      </section>
   )
}

export default Register;