import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import '../index.css';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ProtectedRoute } from './ProtectedRoute.js';
import * as auth from '../utils/Auth';
import InfoTooltip from './InfoTooltip.js';


function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSuccessSignUp, setSuccessSignUp] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo().then((data) => {
        setCurrentUser(data.data);
      })
        .catch((err) => {
          console.error(`Ошибка получения данных профиля: ${err}`);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getInitialCards().then((card) => {
        setCards(card);
      }).catch((err) => {
        console.error(`Ошибка загрузки карточек: ${err}`);
      });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        ).catch((err) => console.error(`Ошибка добавления лайка карточки: ${err}`));
    } else {
      api.removeLike(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((err) => console.error(`Ошибка удаления лайка карточки: ${err}`));
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.error(`Ошибка загрузки карточек: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true);
  }


  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name: name, job: about })
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка получения данных профиля: ${err}`);
      });
  }

  function handleUpdateAvatar({ link }) {
    api.changeAvatar({ link })
      .then((data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка обновления аватара: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка добавления новой карточки: ${err}`);
      });
  }

  function checkToken() {
    auth.checkToken()
      .then((data) => {
        if (!data) {
          return;
        };
        setEmail(data.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setLoggedIn(false);
        console.error(`Ошибка токена: ${err}`);
      });
  }

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogin() {
    setLoggedIn(true);
  }

  function logout() {
    setLoggedIn(false);
    setEmail('');
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">

          <Header
            email={email}
            onLogout={logout}
          />

          <Routes>
            <Route path="/" element={
              <ProtectedRoute element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  setCards={setCards}
                />}
                isLoggedIn={isLoggedIn} />
            } />

            <Route path="/sign-up" element={
              <Register
                setSuccessSignUp={setSuccessSignUp}
                onTooltipOpen={handleInfoTooltipOpen}
              />
            } />

            <Route path="/sign-in" element={
              <Login
                onLogin={handleLogin}
                setEmail={setEmail}
              />
            } />

            <Route path="/*"
              element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />

          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm name="delete" title="Вы уверены?" />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccessSignUp={isSuccessSignUp}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
