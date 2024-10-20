import Link from 'next/link';

interface ArtisanInfoProps {
  artisan: {
    name: string;
    slug: string;
    bio: string;
    image: string;
  };
}

const ArtisanInfo: React.FC<ArtisanInfoProps> = ({ artisan }) => (
  <div className="flex items-center mb-8 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-yellow-400">
    {/* Artisan Image with Cultural Border */}
    <Link href={`/artisan/${artisan.slug}`}>
      <img
        src={artisan.image}
        alt={artisan.name}
        className="w-16 h-16 object-cover rounded-full mr-4 cursor-pointer border-2 border-yellow-600 transition-transform duration-300 hover:scale-110"
      />
    </Link>
    <div>
      {/* Artisan Name with Cultural Color */}
      <h3 className="font-semibold text-lg text-red-700 hover:text-green-700 transition-colors duration-200 font-serif">
        <Link href={`/artisan/${artisan.slug}`}>
          {artisan.name}
        </Link>
      </h3>
      {/* Artisan Bio */}
      <p className="text-gray-700 mt-1 text-sm font-light">
        {artisan.bio}
      </p>
    </div>
  </div>
);

export default ArtisanInfo;
