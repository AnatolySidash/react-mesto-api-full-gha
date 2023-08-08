import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

   const [name, setName] = React.useState('');
   const [link, setLink] = React.useState('');

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function handleLinkChange(event) {
      setLink(event.target.value);
   }

   function handleSubmit(event) {
      event.preventDefault();

      // Передаём значения управляемых компонентов во внешний обработчик
      onAddPlace({
         name: name,
         link: link
      });
   }

   React.useEffect(() => {
      setName('');
      setLink('');
   }, [isOpen]);

   return (
      <PopupWithForm
         name="add"
         title="Новое место"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            className="popup__input popup__input_type_name"
            id="place__input"
            value={name}
            name="name"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required
            onChange={handleNameChange}
         />
         <span className="popup__input-error popup__input-error_type_name" />
         <input
            className="popup__input popup__input_type_job"
            id="link__input"
            name="link"
            value={link}
            type="url"
            placeholder="Ссылка на картинку"
            required
            onChange={handleLinkChange}
         />
         <span className="popup__input-error popup__input-error_type_link" />
      </PopupWithForm>
   )
}

export default AddPlacePopup;