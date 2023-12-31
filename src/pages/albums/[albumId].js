// pages/album/[albumId].js
import Image from 'next/image';
import Link from 'next/link';
export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums = await res.json();

  const paths = albums.map((album) => ({
    params: { albumId: album.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${params.albumId}`);
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
}
const AlbumDetailsPage = ({ photos }) => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center h-16 bg-gray-800 px-20">
        <h1 className="text-white text-xl font-bold">Album Details</h1>
        <Link
          href="/"
          className="flex items-center text-white font-bold hover:underline"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Albums
        </Link>
      </nav>
      <div className="container mx-auto mt-16 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {photos.map((photo) => (
            <div key={photo.id}>
              <Image
                src={photo.url}
                alt={photo.title}
                width={200}
                height={200}
                className="rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsPage;
