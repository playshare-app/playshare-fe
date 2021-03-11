import request from 'superagent';


const URL = 'http://localhost:3000';
// const URL = 'https://serene-thicket-62850.herokuapp.com'


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

export async function getPlaylists(token) {
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
    .send(playlist);

  return response.body;
}
//DELETE
export async function deletePublicPlaylist(id, token) {
  const response = await request
    .delete(`${URL}/api/myplaylists/${id}`)
    .set('Authorization', token)
    // .send(playlist);

  return response.body;
}

export async function getPublicPlaylists() {
  const response = await request.get(`${URL}/playshare`);
  // .set('Authorization', token);

  return response.body;
}

export async function getPublicPlaylistPersonal(token) {
  const response = await request
  .get(`${URL}/api/myplaylists`)
  .set('Authorization', token)

  return response.body;
}

//COMMENTS ONLY ===========

export async function postComment(comment_test, user_email, playlistid) {
  const response = await request
  .post(`${URL}/comments`)
  .send({comment_test, user_email, playlistid});
  //.set('Authorization', token)

  return response.body;
}

export async function getPublicComments() {
  const response = await request.get(`${URL}/comments`);
  // .set('Authorization', token);

  return response.body;
}

