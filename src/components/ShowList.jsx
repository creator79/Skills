// ShowList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch shows');
        }
        return response.json();
      })
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-bold mb-8 flex mx-auto justify-center text-white">TV SHOWS </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shows.map(show => (
            <div key={show.id} className="bg-gray-800 p-4 rounded shadow ">
              <Link to={`/shows/${show.id}`}>
                <img src={show.image.original} alt={show.name} className="w-full h-auto" />
                <h2 className="text-lg font-semibold mt-2 text-white">{show.name}</h2>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowList;
