// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*Add a SearchBar component*/}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/*Add a SearchResults component*/}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/*Add a Playlist component*/}
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some(playlistTrack => (playlistTrack.id === track.id))) {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
  }

  async search(term) {
    console.log(`You are searching for the song ${term}`);
    Spotify.getAccessToken();
    let searchResults = await Spotify.search(term);
    this.setState({ searchResults: searchResults });
  }
}

export default App;
