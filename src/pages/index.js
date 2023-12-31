// pages/index.js
import Link from 'next/link';
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums');
  const albums = await res.json();

  return {
    props: {
      albums,
    },
  };
}

const HomePage = ({ albums }) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">Albums List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-800">
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-xs text-white bg-indigo-500 dark:bg-indigo-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Albums Title
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr
                key={album.id}
                className="odd:bg-gray-100 odd:dark:bg-gray-700 even:bg-gray-200 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{album.title}</td>
                <td>
                  <Link href={`/albums/${album.id}`}>
                    <button
                      type="button"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
