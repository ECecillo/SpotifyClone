import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline';

function Sidebar() {
  return (
    /* Met le texte en gris, p-5 : padding de 5, text-sm : redimenssionne le texte en fonction des breakpoints réduit la taille pour version mobile. */
    /* Border-r met une bodure juste sur la droite et met à la couleur noir */
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      {/* space-y-4 : ajoute de l'espace entre nos composants */}
      <div className="space-y-4">
        {/* Pour chaque bouton on va mettre en flex pour que les éléments à l'intérieur (icone + Texte soit en ligne) */}
        {/* On centre les éléments avec items-center */}
        {/* hover method en line style */}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search me</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        {/* On va mettre une bordure vers le bas en noir et on lui passe une taille que le compilateur de style va interpréter [0.1px] */}
        <hr className="border-t-[0.1px] border-gray-900" />


        {/* Autre partie de la sidebar */}
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>
        {/* On va mettre une bordure vers le bas en noir et on lui passe une taille que le compilateur de style va interpréter [0.1px] */}
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlists que l'on va récupérer avec l'API */}
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
        <p className="cursor-pointer hover:text-white"> Playlist name...</p>
      </div>
    </div>
  );
}
export default Sidebar;
