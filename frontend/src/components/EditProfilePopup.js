import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

   const [name, setName] = React.useState('');
   const [description, setDescription] = React.useState('');

   const currentUser = React.useContext(CurrentUserContext);

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function handleJobChange(event) {
      setDescription(event.target.value);
   }

   React.useEffect(() => {
      if (currentUser.name) {
         setName(currentUser.name);
      }
      if (currentUser.about) {
         setDescription(currentUser.about);
      }
   }, [currentUser, isOpen]);

   function handleSubmit(event) {
      event.preventDefault();

      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
         name: name,
         about: description,
      });
   }

   return (
      <PopupWithForm
         name="edit"
         title="Редактировать профиль"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            className="popup__input popup__input_type_name"
            id="name__input"
            value={name}
            name="name"
            type="text"
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            required
            onChange={handleNameChange}
         />
         <span className="popup__input-error popup__input-error_type_name" />
         <input
            className="popup__input popup__input_type_job"
            id="job__input"
            value={description}
            name="job"
            type="text"
            placeholder="О себе"
            minLength={2}
            maxLength={200}
            required
            onChange={handleJobChange}
         />
         <span className="popup__input-error popup__input-error_type_job" />
      </PopupWithForm>
   )
}

export default EditProfilePopup;