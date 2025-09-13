// next image
import Image from 'next/image';

const Avatar = ({ profilePhoto }) => {
  // Utiliser l'image de profil si disponible, sinon l'image par défaut
  const imageSrc = profilePhoto?.photo_url || '/avatar.png';
  const imageAlt = profilePhoto ? `Photo de profil de ${profilePhoto.titre}` : 'Photo de profil par défaut';

  return (
    <div className='hidden xl:flex xl:max-w-none'>
      <Image
        src={imageSrc}
        width={737}
        height={678}
        alt={imageAlt}
        className='translate-z-0 w-full h-full'
        priority
      />
    </div>
  );
};

export default Avatar;
