import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify'
import { millisToMinutesAndSeconds } from "../lib/time"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"


function Song({ order, track }) {
    const spotifyApi = useSpotify(); // On aura besoin de l'api lorsque l'on voudra jouer de la musique.

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState); // Information sur la musique que l'on a clické.
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState); // Etat de lecture de la musique.

    const playSong = () => {
        // Lorsque l'on clique sur une musique on récupère son id, on dit au lecteur de se lancer en mettant l'état de isPlaying à true.
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);

        // On demande à l'API spotify de jouer la musique qui a cette uri.
        spotifyApi.play({
            uris: [track.track.uri],
        })
    };


    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10'
                    src={track?.track?.album.images?.[0]?.url}
                    alt="Album url" />
                <div>
                    <p className='w-36 lg:w-64 text-white truncate'>{track.track.name}</p>
                    <p className='w-40'>{track.track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-40 hidden md:inline'>{track.track.album.name}</p>
                <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song