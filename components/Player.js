import { useSession } from 'next-auth/react';
import {debounce} from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify'
import { useSongInfo } from '../hooks/useSongInfo'
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon
} from '@heroicons/react/outline';

import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';

function Player() {
  /* 
    Fonctionnement : 
      Lorsque l'on veut jouer une musique on envoie à spotify la musique que l'on veut jouer et se déclenche sur leur serveur (met en marche leur player, récup l'infos de la musique ect ...). 

      Nous ce que l'on veut c'est récup les infos que spotify renvoie sur leur lecteur et les utiliser sur notre propre app avec spotifyApi.
  */


  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  // Par défaut on met le volum à 50 (on peut modifier et voir si on sauvegarde pas les préf de l'utilisateur dans le LocalStorage)
  const [volume, setVolume] = useState(50);

  // Hook qui permet de récup les infos de la musique.
  const songInfo = useSongInfo();

  // Info côté Spotify.
  const fetchCurrentSong = () => {
    if (!songInfo) {
      // Si on reçoit bien un object avec les infos de la musique on va demander à l'API spotify de nous retourner la musique que l'on a demandé à lancer et on set nos RecoilState avec les infos de retour.
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Now Playing ", data.body?.item)
        setCurrentTrackId(data.body?.item?.id); // On défini la musique que l'on joue.


        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          // Spotify nous renvoie si on est en train de jouer la musique ou non.
          setIsPlaying(data.body?.is_playing);
        })
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause(); // Dit à spotify de mettre en pause la musique.
        setIsPlaying(false)
      }
      else {
        spotifyApi.play(); // joue la musique.
        setIsPlaying(true)
      }
    })
  };



  useEffect(() => {
    if (spotifyApi.getAccessToken && !currentTrackId) { // Si le token est toujours d'actu et que l'on a choisi une musique à jouer.
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session])




  useEffect(() => {
    if(volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]) /* Si le volume change */

  /* useCallback : Appelera cette fonction seulement si on  */
  const debouncedAdjustVolume = useCallback(
    // Comme un useEffect avec un setInterval.
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {}); // Envoie une requête à l'API.
    }, 500),
    []
  );


  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      {/* Partie gauche */}
      <div className='flex items-center space-x-4'>
        {/* Song Info */}
        <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="Song Album" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Centre */}
      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button' /> {/* Ici on a défini une classe réutilisable dans global */}
        <RewindIcon onClick={() => spotifyApi.skipToPrevious()} className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className='button h-10 w-10' />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon onClick={() => spotifyApi.skipToNext()} className="button" />
        <ReplyIcon className='button' />
      </div>
      {/* Right (volume ... ) */}
      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
        <input
          className='w-14 md:w-28'
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={e => setVolume(Number(e.target.value))} /> 
          {/* On va utiliser une debounce function pour éviter de surcharger l'API et limiter les perfs. */}

        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
      </div>
    </div>
  )
}

export default Player