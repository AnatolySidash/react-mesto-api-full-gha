import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

   const currentUser = React.useContext(CurrentUserContext);

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__block">
               <div className="profile__avatar-box">
                  <img alt="Фотография пользователя"
                     src={currentUser.avatar}
                     onClick={onEditAvatar}
                     className="profile__avatar" />
               </div>
               <div className="profile__content">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <p className="profile__description">{currentUser.about}</p>
                  <button type="button" onClick={onEditProfile} className="profile__edit-button" />
               </div>
            </div>
            <button type="button" onClick={onAddPlace} className="profile__add-button" />
         </section>
         <section className="elements">
            <ul className="elements__list">
               {cards.map((card) => (
                  <Card
                     key={card._id}
                     card={card}
                     onCardClick={onCardClick}
                     onCardLike={onCardLike}
                     onCardDelete={onCardDelete}
                  />
               ))}
            </ul>
         </section>
      </main >
   );

}

export default Main;