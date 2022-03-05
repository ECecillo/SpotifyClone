// Fonction qui nous servira à calculer la durée d'une musique.

export function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis/60000); // On convertit nos ms en minutes.
    const seconds = ((millis % 60000) / 1000).toFixed(0); // calcul les secondes et les arrondis à l'unité.
    return seconds == 60 
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}