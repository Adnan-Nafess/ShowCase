import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const Cards = ({ data, title }) => {
    const getImageUrl = (path) =>
        path ? `https://image.tmdb.org/t/p/original/${path}` : noimage;

    return (
        <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-8 bg-[#1F1E24]">
            {data.map((c, i) => {
                const { id, media_type, name, title, original_name, original_title, poster_path, backdrop_path, profile_path, vote_average } = c;
                const imageUrl = getImageUrl(poster_path || backdrop_path || profile_path);
                const cardTitle = name || title || original_name || original_title;

                return (
                    <Link
                        to={`/${media_type || title}/details/${id}`}
                        className="relative w-[90%] sm:w-[45%] md:w-[20%] lg:w-[15%] flex flex-col items-center mx-auto sm:mx-0"
                        key={i}
                    >
                        <div className="relative w-full h-[50vw] sm:h-[35vh] lg:h-[40vh] overflow-hidden rounded-lg shadow-lg">
                            <img
                                className="w-full h-full object-cover"
                                src={imageUrl}
                                alt={cardTitle || "Movie Poster"}
                            />
                            {vote_average && (
                                <div className="absolute right-2 top-2 bg-yellow-600 text-sm sm:text-lg font-semibold rounded-full text-white w-10 h-10 flex justify-center items-center shadow-md">
                                    {Math.round(vote_average * 10)}<sup>%</sup>
                                </div>
                            )}
                        </div>
                        <h1 className="mt-2 text-center text-sm sm:text-base lg:text-lg font-semibold text-zinc-400 truncate w-full">
                            {cardTitle}
                        </h1>
                    </Link>
                );
            })}
        </div>
    );
};

export default Cards;
