import SpotifyWebAPi from 'spotify-web-api-node';

// On définit quelle scope on demande
const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
  'user-library-read',
  'user-top-read',
  //"user-library-modify",
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',');
// On va créer une chaine de caractère qui va stocker toutes les propriétés que l'on a au dessus que l'on va envoyer

const params = {
  // Pour l'API spotify on passe la string scopes à param (exemple .../authorize?params=scopes)
  scope: scopes,
};
// Créer un objet de type url search qui va définir des méthodes utilitaires pour travailler avec la chaîne de requête (les paramètres GET) d’une URL..
const queryParamString = new URLSearchParams(params);

// Créer notre string qui sera l'url vers l'api spotify.
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebAPi({
  clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
