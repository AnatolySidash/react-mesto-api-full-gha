import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

   const avatarRef = React.useRef();

   function handleSubmit(event) {
      event.preventDefault();

      onUpdateAvatar({
         link: avatarRef.current.value
      });
   }

   React.useEffect(() => {
      avatarRef.current.value = '';
   }, [isOpen]);

   return (
      <PopupWithForm
         name="avatar"
         title="Обновить аватар"
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            className="popup__input popup__input_type_avatar"
            id="avatar-link__input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            ref={avatarRef}
            required
         />
         <span className="popup__input-error popup__input-error_type_link" />
      </PopupWithForm>
   )
}

export default EditAvatarPopup;