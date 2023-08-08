import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
   return (
      <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
         <div className="popup__container">
            <button type="button" onClick={onClose} className="popup__close" />
            <h2 className="popup__title">{title}</h2>
            <form name={`form form__${name}`} onSubmit={onSubmit} className="popup__form popup__form_type_edit" noValidate>
               {children}
               <button type="submit" className="popup__button popup__button_type_add">Создать</button>
            </form>
         </div>
      </section>
   )
}

export default PopupWithForm;