import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    // Destructure l'objet de la réponse:
    // http://michaelthelin.se/spotify-web-api-node/#refreshAccessToken
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken(); // Met à jour l'access Token.

    console.log('REFRESHED TOKEN IS ', refreshedToken);
    return {
      ...token, // Le nouveau token.
      accessToken: refreshedToken.access_Token,  // Récupère le nouvelle access token.
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // Calcule l'heure et la date à laquelle le prochain token expirera que l'on multiplie par 1000 pour avois un résultat sous la forme d'heure et pas de ms.

      // Remplace notre ancien refresh token si on en reçoit un sinon reprend l'ancien.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    // Si on a un problème dans la demande d'un nouveau refresh token on donne l'erreur.
    console.error(error);
    return {
      ...token, // On retourne le token qui a produit l'erreur.
      error: 'refreshAccessToken Error',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL, // LOGIN_URL : Spécifie toutes les permissions dont on aura besoin et les mets dans un URL.
    }),
  ],
  secret: process.env.JWT_SECRET, // Token que l'on stockera côté client et qui sera encrypted.
  pages: {
    // Spécifie une page de login spéciale lorsque l'on utilisera le /api/auth/signIn .
    signIn: '/login',
  },
  callbacks: {
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({ token, account, user }) {
      // Si on s'est bien connecté on devrait avoir une variable user, account
      // si c'est la première fois que l'on se connecte alors :
      // On retourne le token suivant.
      if (account && user) {
        // Ce que prisma remplis automatiquement lorsque l'on se connecte.
        return {
          ...token, // Retourne le Token JWT que Spotify nous donne.
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccoundId,
          accessTokenExpires: account.expires_at * 1000, // On convertit le temps que Spotify nous donne (1 h) en ms.
          // Permettra de savoir quand on enverra une nouvelle requête à spotify pour avoir un nouveau access token voir un refresh token.
        };
      }
      
      // C'est là que l'on regarde si on aura besoin de renvoyer une nouvelle requête.
      // Ici le token est encore valide donc on le retourne.
      if (Date.now() < token.accessTokenExpires) { 
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      }
      // Si le token d'accès a expiré après 1 h.
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
      // fonction qui va rafraichir le token.
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // On donne les infos côté client qui les stockera dans des cookiees HttpOnly.
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
