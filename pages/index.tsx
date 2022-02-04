import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Spotify Clone :D</title>
      </Head>
      {/* On met la taille du main à la taille de l'écran/fenêtre et on lui passe overflow-hidden pour formatter le */}
      <main className="bg-black h-screen overflow-hidden">
        <Sidebar />
      </main>
    </div>
  );
}
