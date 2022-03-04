import { getProviders, signIn } from "next-auth/react"
import Image from "next/image";


// Avant que la page se charge (que le DOM commence à mettre le HTML), on doit préparer certains éléments côté serveur.

function Login({ providers }) { // On destructure ce que l'on a retourné en dessous.
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Image className="w-52 mb-5" src="https://links.papareact.com/9xl" width="100%" height="100%" alt="Spotify logo" />
      {Object.values(providers).map((provider) => ( // Récupère les éléments de l'object que l'on a déclaré pour next auth.
        <div key={provider.name}>
          <button className="bg-[#18D860] text-white p-5 rounded-full" 
          onClick={() => signIn(provider.id, { callbackUrl: "/" })}> 
          {/* provider.id : 0 = spotify par exemple si on a plusieurs provider et en fonction de l'ordre ce sera différent. */}
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
export default Login;


// SSR
export async function getServerSideProps() {
  // On lance cette partie avant que l'on commence à charger le contenu du composant Login, on veut récupérer les providers dans next auth.
  const providers = await getProviders();
  // On en a besoin pour demander à spotify les tokens, l'accès ....
  return {
    props: {
      providers // On récupère le tableau de providers dans next-auth
    }
  }
} 