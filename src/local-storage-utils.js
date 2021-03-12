export const USER = 'USER';
export const TOKEN = 'token';


export function getUserFromLocalStorage() {
  let user = localStorage.getItem(USER);

  user = JSON.parse(user);

  if (user && user.token) {
    return user;
  } else {
    return {
      email: '',
      password: '',
      token: ''
    };
  }
}

export function getSpotifyTokenFromLocalStorage() {
  let token = localStorage.getItem(TOKEN);

  if (token) { 
    return token;
  } else {
    return { 
      token: ''
    };
  }

}


export function putUserInLocalStorage(user) {
  localStorage.setItem(USER, JSON.stringify(user));
}

export function putSpotifyTokenInLocalStorage(_token) {
  localStorage.setItem('token', _token);
}

