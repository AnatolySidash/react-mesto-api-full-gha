import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

   const currentUser = React.useContext(CurrentUserContext);
   const isOwn = card.owner._id === currentUser._id;
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = (`elements__like-icon ${isLiked ? 'elements__like-icon_active' : ''}`);

   return (
      <article className="elements__item">
         <img className="elements__image"
            src={card.link}
            alt={card.name}
            onClick={() => onCardClick(card)} />
         {isOwn && <button className='elements__delete-icon' onClick={() => onCardDelete(card)} />}
         <div className="elements__name">
            <h2 className="elements__title">{card.name}</h2>
            <div className="elements__like-block">
               <button type="button"
                  className={cardLikeButtonClassName}
                  onClick={() => onCardLike(card)}>
               </button>
               <span className="elements__like-count">{card.likes.length}</span>
            </div>
         </div>
      </article >
   );
}

export default Card;
