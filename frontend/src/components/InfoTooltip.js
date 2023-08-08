import React from 'react';
import success from '../images/05_auth/success.svg';
import fail from '../images/05_auth/fail.svg';

function InfoTooltip({ isOpen, onClose, isSuccessSignUp }) {

   return (
      < section className={`tooltip ${isOpen ? "tooltip_opened" : ""}`} >
         <div className="tooltip__container">
            <button
               type="button"
               className="popup__close"
               onClick={onClose} />
            <img src={isSuccessSignUp ? success : fail} alt={isSuccessSignUp ? success : fail} className="tooltip__logo" />
            <h3 className="tooltip__title">{isSuccessSignUp ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
         </div>
      </ section >
   )
}

export default InfoTooltip;