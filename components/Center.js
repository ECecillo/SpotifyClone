import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash"
import { playlistState, playlistIdState } from '../atoms/playlistAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../hooks/useSpotify';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

export default function Center() {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState); // On récupère simplement l'ID, on a pas besoin de la passer en state puisqu'on ne veut pas la changer.
    const [playlist, setPlaylist] = useRecoilState(playlistState); // On défini la playlist quand center va charger.


    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId]); // On change la couleur quand la playlist change d'id.

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        })
            .catch((err) => {
                console.log("Something went wrong !", err);
            })
    }, [spotifyApi, playlistId]);



    return (
        <div className="flex-grow text-white">
            <header className='absolute top-5 right-8'>
                <div className="flex items-center bg-black space-x-3 text-white opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="Profile Image" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`} >

                <img className='h-44 w-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt="Playlist Image" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
                </div>
            </section>
        </div>
    )
}
