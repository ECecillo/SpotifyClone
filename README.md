# Spotify Clone 

## Demo

Vous pouvez accéder au site, mais vous ne pourrez pas vous connecter à cause des limitations de Spotify !

Si vous souhaitez accéder à cette dernière, contactez moi par mail en précisant pourquoi vous voulez y accéder.

https://spotify-clone-ececillo.vercel.app/



## Installation et Test

Après le clonage ou le téléchargement du projet, veuillez installer les packages du projet via la commande : 
`npm i`

Pour lancer le serveur en local avec NextJS : 
`npm run dev`

## !!! Prérequis !!!

### Spotify et .env  

1. Pour utiliser l'API de Spotify et pouvoir récupérer ses plyalists, faire des recherches .... Il faut avoir au préalable créer une application dans la partie développeur de Spotify.

2. Sur le Dashboard de votre application, allez dans `Edit Settings`, vous allez devoir ajouter un **Url de Redirection** qui sera le suivant : `http://localhost:3000/api/auth/callback/spotify`  

3. Après avoir fais ça, il faut récupérer les credentials (Client ID, Cliend Secret) que vous trouverez sur le dashboard de votre app.

4. Créer un fichier `.env` dans lequel vous allez mettre : 
```
NEXTAUTH_URL=http://localhost:3000/
NEXT_PUBLIC_CLIENT_ID=Votre_Client_ID_SPOTIFY
NEXT_PUBLIC_CLIENT_SECRET=Votre_SECRET_Client_SPOTIFY
```
5. Vous devez créer une clé de chiffrement pour crypter votre token (JWT), sous linux vous pouvez taper : `openssl rand -base64 32`. (Pour ceux sous Windows je vous invite à en faire une vous même) que vous placerez dans le `.env` sous la forme suivante : 
```
JWT_SECRET=Ma_Super_Clé_Crypté
```

OOF, la configuration est enfin fini, si vous avez un problème n'hésitez pas à mettre une issue :D et bon codage.



