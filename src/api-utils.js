import request from 'superagent';

const URL = 'http://localhost:3000';

export async function signUpUser(email, password) {
  const response = await request.post(`${URL}/auth/signup`).send({
    email: email,
    password: password
  });
  return response.body;
}

export async function logInUser(email, password) {
  const response = await request.post(`${URL}/auth/signin`).send({
    email: email,
    password: password
  });
  return response.body;
}

export async function getPlaylists(token){
  const response = await request
  // .get(`${URL}/playlist`)
  // .set('Authorization', 'Bearer ' + token);
  .get('https://api.spotify.com/v1/me/playlists?limit=5&offset=5')
  .set('Authorization', `Bearer ${token}`)
  .set('Accept', 'application/json');

  return response.body;
}

export async function addPublicPlaylist(playlist, token) {
  const response = await request
      .post(`${URL}/api/playshare`)
      .set('Authorization', token)
      .send(playlist)

  return response.body;
}

export async function getPublicPlaylists(token) {
  const response = await request
      .get(`${URL}/api/playshare`)
      .set('Authorization', token);

  return response.body;
}
