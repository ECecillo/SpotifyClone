import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center'
export default function Home() {
  return (
    < div className="bg-black h-screen overflow-hidden" >
      {/* On met la taille de la div à la taille de l'écran/fenêtre et on lui passe overflow-hidden pour éviter que lorsque l'on va scroll vers le bas les titres on ne scoll pas la navbar */}
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div >
  );
}
