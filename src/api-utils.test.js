import { getPublicPlaylists, addPublicPlaylist } from './api-utils.js';

describe('api calls', () => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjE1NDExOTQ1fQ.O2iAEG8SQXYLqpcqwFXBRNzndf7Quf27cGZoCDcjf2Y';

  test('adding a public playlist', async () => {
    const newPlaylist = await addPublicPlaylist(
      {
        name: 'Lo-Fi Beats',
        uri: 'spotify:user:wizzler:playlist:53Y8wT46QIMz5H4WQ8O22c',
        playlist_id: '09850394',
        owner_name: 'Zina',
        owner_id: 7
      },
      token
    );

    expect(newPlaylist).toEqual([
      {
        name: 'Lo-Fi Beats',
        owner_id: 7,
        owner_name: 'Zina',
        playlist_id: '09850394',
        uri: 'spotify:user:wizzler:playlist:53Y8wT46QIMz5H4WQ8O22c'
      }
    ]);
  });
});
