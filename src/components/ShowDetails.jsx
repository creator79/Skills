// ShowDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import "../App.css";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        return response.json();
      })
      .then((data) => {
        setShow(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-8 flex mx-auto justify-center">
        SHOW DETAILS{" "}
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <section className="detail">
          <div className="content">
            <h2>{show?.name}</h2>

            <div className="flex flex-col sm:flex-row  mb-[-1rem]">
              <span className="text-2xl font-semibold">
                Language: {show.language}
              </span>
              <span className="text-2xl font-semibold">Type: {show.type}</span>
              <span className="text-2xl font-semibold">
                Duration: {show.schedule.time}
              </span>
              <span className="text-2xl font-semibold">
                Days: {show.schedule.days}
              </span>
              <span className="text-2xl font-semibold">
                Status: {show.status}
              </span>
              <span className="text-2xl font-semibold">
                Rating: {show.rating.average}
              </span>
            </div>

            <div className="flex mb-7">
              <h3 className="mr-5 ml-7 text-2xl">Genres:</h3>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                  >
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            <div className="about">
              <img src={show.image.original} alt="" />

              <p
                className="text-white"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              ></p>
            </div>

            <Link
              to={`/shows/${id}/book`}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Book Ticket
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShowDetails;
