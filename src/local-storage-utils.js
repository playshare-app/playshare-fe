export const USER = 'USER';

// this function will give us a user object
export function getUserFromLocalStorage() {
    let user = localStorage.getItem(USER);
    
    user = JSON.parse(user);

    if (user && user.token) {
      return user;

    } else {
      return {
        email: '',
        password: '',
        token: '',
      }
    }

}

export function putUserInLocalStorage(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}