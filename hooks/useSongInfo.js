import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify'

// Ce hook nous sert à faire une requête API sur la musique que l'on a selectionné, on a déjà les infos dans playlist en soit mais là on récup que une musique plutôt que de chercher dans la playlist (nous servira quand on voudra faire la searchbar)
export function useSongInfo() {

    const spotifyApi = useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState);

    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentIdTrack) { // si on a choisi une musique on veut faire une requête qui récup la musique qui a cette id.
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`, // Bearer : dit à l'API que l'utilisateur qui se co est bien authentifié à l'application.
                        }
                    }
                )
                    .then(res => res.json());
                setSongInfo(trackInfo);
            }
        }
        fetchSongInfo();
    }, [currentIdTrack, spotifyApi])

    return songInfo;
}