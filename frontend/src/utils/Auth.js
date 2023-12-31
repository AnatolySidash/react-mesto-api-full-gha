const baseUrl = "https://api.mesto.sidash.nomoreparties.co";

function getResponseData(res) {
   if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
   }
   return res.json();
}

export const register = (email, password) => {
   return fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
   })
      .then(getResponseData);
};

export const login = (email, password) => {
   return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
   })
      .then(getResponseData);
};

export const clearCookie = () => {
   return fetch(`${baseUrl}/signout`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json"
      },
      credentials: "include",
   })
      .then(getResponseData);
}

export const checkToken = () => {
   return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
   })
      .then(getResponseData);
};