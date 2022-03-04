import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Spotify Clone :D</title>
      </Head>
      {/* On met la taille de la div à la taille de l'écran/fenêtre et on lui passe overflow-hidden pour éviter que lorsque l'on va scroll vers le bas les titres on ne scoll pas la navbar */}
      <div className="bg-black h-screen overflow-hidden">
        <main>
          <Sidebar />
        </main>
      </div>
    </div>
  );
}
