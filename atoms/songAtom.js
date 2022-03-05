import {atom} from "recoil"

// Nous dira quelle musique on a choisi
export const currentTrackIdState = atom ({
    key: "currentTrackIdState", // Id unique qui respecte la doc de recoil.
    default: null, // Valeur par défault.
});

// Etat de lecture.
export const isPlayingState = atom ({
    key: "isPlayingState",
    default: false,
})