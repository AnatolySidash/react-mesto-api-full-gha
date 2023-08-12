import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../images/01_header/logo.svg';

function Header({ email, onLogout }) {

   const location = useLocation();

   return (
      <header className="header">
         <img src={logo} alt="Логотип сайта в виде надписи белого цвета латинскими буквами: Место Россия" className="logo" />
         <nav className="nav">
            {location.pathname !== "/sign-in" && location.pathname !== "/" && <NavLink to="/sign-in" className="nav__link">Войти</NavLink>}
            {location.pathname !== "/sign-up" && location.pathname !== "/" && <NavLink to="/sign-up" className="nav__link">Регистрация</NavLink>}
            {location.pathname === "/" && <p className="nav__email">{email}</p>}
            {location.pathname === "/" && < NavLink to="/sign-in" onClick={onLogout} className="nav__link">Выйти</NavLink>}
         </nav>
      </header >
   )
}

export default Header;