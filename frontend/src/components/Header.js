import React from 'react';
import logo from '../images/01_header/logo.svg';

function Header() {
   return (
      <header className="header">
         <img src={logo} alt="Логотип сайта в виде надписи белого цвета латинскими буквами: Место Россия" className="logo" />
      </header>
   )
}

export default Header;