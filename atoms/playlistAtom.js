import { atom } from "recoil"

export const playlistState = atom({
    key: "playlistState",
    default: null,
});

export const playlistIdState = atom({
    key: "playlistIdState", // Doit être un identifiant unique pour chaque atom.
    default: "37i9dQZF1DZ06evO47cwRq",  // Id de la Playlist par défault (choisie arbitrairement).
})