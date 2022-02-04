import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    // Destructure la réponse:
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('REFRESHED TOKEN IS ', refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_Token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 heure puisque 3600 est retourné par l'api Spotify
      // Remplace si un nouveau Token est renvoyé sinon on reprend l'ancien.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
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
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    // Dit vers quelle page on doit aller quand on se log ou logout.
    signIn: '/login',
  },
  callbacks: {
    // https://next-auth.js.org/tutorials/refresh-token-rotation
    async jwt({ token, account, user }) {
      // Si on s'est bien connecté on devrait avoir une variable user, account
      // si c'est la première fois que l'on se connecte alors :
      // On récupère le token.
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccoundId,
          accessTokenExpires: account.expires_at * 1000, // Convertit le temps du token qui est en ms.
        };
      }
      // Retourne le dernier token si le token d'accès est encore valide.
      if (Date.now() < token.accessTokenExpires) {
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      }
      // Si le token d'accès a expiré après 1 h.
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...');
      // Va rafraichir le token.
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      // Récupère les infos de l'user et les def.
      session.user.accessToken = token.accessToken; // partie que l'utilisateur va voir.
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
