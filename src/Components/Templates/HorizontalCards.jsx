import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";

const HorizontalCards = ({ data }) => {
    return (
        <div className="w-full flex flex-wrap md:flex-nowrap gap-5 p-5 overflow-x-auto">
            {data.length > 0 ? data.map((d, i) => (
                <Link
                    to={`/${d.media_type}/details/${d.id}`}
                    key={i}
                    className="min-w-[15%] bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
                >
                    <img
                        className="w-full h-40 object-cover"
                        src={
                            d.backdrop_path || d.poster_path
                                ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`
                                : noimage
                        }
                        alt={d.title || d.name || d.original_name || d.original_title}
                    />
                    <div className="text-white p-4">
                        <h1 className="text-lg font-semibold truncate">
                            {d.title || d.name || d.original_name || d.original_title}
                        </h1>
                        <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                            {d.overview.slice(0, 50)}...
                            <span className="text-blue-500 cursor-pointer ml-1">more</span>
                        </p>
                    </div>
                </Link>
            )) : (
                <h1 className="text-3xl text-white mt-5 font-black text-center">
                    Nothing to Show
                </h1>
            )}
        </div>
    );
};

export default HorizontalCards;
