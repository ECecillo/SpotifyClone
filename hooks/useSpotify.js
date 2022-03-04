import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react';
import spotifyApi from '../lib/spotify';

function useSpotify() {
    const { data: session, status } = useSession();
    useEffect(()=> {
        if(session) {
            // Si on a eu un problème dans la récupération du nouveau token et on redirige l'user vers la page de connexion.
            if(session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.access_token);
        }
    },[session]); // Se lance au lancement de l'app et lorsque session est bien défini.

    
    return spotifyApi;
}

export default useSpotify