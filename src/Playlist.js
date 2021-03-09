import React, { Component } from 'react'
// import { getPlaylists } from './api-utils';
import { getPublicPlaylists, addPublicPlaylist } from './api-utils.js';

// import hash from './home';


export default class Playlist extends Component {

    state = {
        publicPlaylist: [],
      };

    // componentDidMount(){
    //     let _token = hash.access_token;
    //     if (_token) {
    //         localStorage.setItem('token', _token);
    //         Set token
    //         this.setState({
    //           token: _token
    //         });
    //         console.log(_token, 'TOKEN')
    //         getPlaylists(_token);
    //       }
    // }

    // fetchVideos = async () => {
    //     const playlist = await getPlaylists(hash.access_token);
    //     console.log(playlist, 'PLAYLIST')
    //     this.setState({ playlist });
    // }

    // componentDidMount = async() => {
    //     if (this.props.token) await this.doFavoritesFetch();
    // }

    // doFavoritesFetch = async () => {
    //     const favorites = await getFavorites(this.props.user.token);

    //     this.setState({ favorites })

    // }
    // doSearch = async () => {
    //     const movies = await searchMovies(this.state.search);

    //     this.setState({ movies });
    // }

    // handleSubmit = async e => {
    //     e.preventDefault();

    //     await this.doSearch();
    // }

    // handleFavoriteClick = async (rawMovie) => {
    //     await addFavorite({
    //         title: rawMovie.original_title,
    //         genre: 'documentary',
    //         director: 'martic scorsese',
    //         year: rawMovie.release_date.slice(0, 4),
    //         poster: rawMovie.poster_path || 'http://placekitten.com/300/300',
    //         runtime: 90,
    //         movie_db_id: rawMovie.id,
    //     }, this.props.user.token);

    //     await this.doFavoritesFetch();
    // }

    // handleSearchChange = e => this.setState({ search: e.target.value })

    // isAFavorite = (movie) => {
    //     if (!this.props.token) return true;

    //     const isIsFavorites = this.state.favorites.find(favorite => favorite.movie_db_id === movie.id);

    //     return Boolean(isIsFavorites);
    // }


    render() {
        return (
            <div className="main-image">
                PLAYLIST
                <iframe src="https://open.spotify.com/embed/playlist/6oFRSx3gEn2E525oPd3JCK" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" title="hello"></iframe>
            </div>
        )
    }
};
