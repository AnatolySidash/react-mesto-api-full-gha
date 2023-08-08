import React from 'react';

function ImagePopup({ card, onClose }) {

   return (
      < section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`} >
         <div className="popup__image">
            <button type="button" className="popup__close" onClick={onClose} />
            <img className="popup__photo" alt={card ? card.name : ''} src={card ? card.link : ''} />
            <h3 className="popup__name">{card ? card.name : ''}</h3>
         </div>
      </ section >
   )
}

export default ImagePopup;

